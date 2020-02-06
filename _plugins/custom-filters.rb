require 'digest'
require 'jekyll'

module Jekyll
  module CustomFilters
    def add_cache_buster(input)
      site = @context.registers[:site]

      page = site.pages.find { |p| p.url == input }
      page ||= site.static_files.find { |f| f.url == input }

      raise "Unable to locate asset for #{input}" if page.nil?

      buster = Digest::SHA256.hexdigest(page.transform) if page.respond_to? :transform
      buster ||= page.mtime if page.respond_to? :mtime
      buster ||= site.time.to_i

      relative_url "#{input}?#{buster}"
    end
  end
end

Liquid::Template.register_filter Jekyll::CustomFilters
