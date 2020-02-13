require 'jekyll'
require 'json'

module Jekyll
  module CustomFilters
    def fingerprint(input)
      @manifest ||= load_manifest!
      result = if @manifest.key? input
        @manifest[input]
      else
        input
      end
      relative_url result
    end
  end
end

def load_manifest!
  manifest = JSON.parse(File.read('./assets/manifest.json'))
  manifest = manifest.transform_keys { |k| "/assets/#{k}" }
  manifest = manifest.transform_values { |v| "/assets/#{v}" }
  manifest
end

Liquid::Template.register_filter Jekyll::CustomFilters
