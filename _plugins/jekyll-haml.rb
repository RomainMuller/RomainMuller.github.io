# frozen_string_literal: true
require 'haml'
require 'jekyll'
require 'liquid'

module Jekyll
  module Converters
    class Haml < Converter
      priority :low
      safe false

      def matches(ext)
        ::Jekyll::Haml::Parser.matches(ext)
      end

      def output_ext(_ext)
        return '.html'
      end

      def convert(content)
        ::Jekyll::Haml::Parser.compile content
      end
    end
  end

  module Tags
    class HamlInclude < IncludeTag
      def read_file(file, context)
        return super(file, context) unless ::Jekyll::Haml::Parser.matches(File.extname(file))
        file_content = File.read(file, file_read_opts(context))
        template = split_frontmatter_and_template(file_content)
        ::Jekyll::Haml::Parser.compile(template)
      end

    private

      def split_frontmatter_and_template(file_content)
        return $POSTMATCH if file_content =~ Document::YAML_FRONT_MATTER_REGEXP
        file_content
      end
    end
  end

  module Haml
    class Parser
      CONFIG = {
        attr_wrapper: '"',
        encoding: 'UTF-8',
        escape_attrs: false,
      }.freeze

      def self.matches(ext)
        ext =~ /^\.haml$/i
      end

      def self.compile(content)
        ::Haml::Engine.new(content, CONFIG).render
      end
    end
  end
end

Liquid::Template.register_tag('include', ::Jekyll::Tags::HamlInclude)

::Jekyll::Hooks.register(:site, :post_read) do |site|
  haml_converter = ::Jekyll::Converters::Haml.new(site.config)
  site.layouts.each do |_, layout|
    next unless haml_converter.matches(layout.ext)
    layout.content = ::Jekyll::Haml::Parser.compile(layout.content)
  end
end
