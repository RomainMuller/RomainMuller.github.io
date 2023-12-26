---
layout: base
changefreq: weekly
eleventyImport:
   collections: [post]
mostRecentCount: 10
---
# About

Hi, I am Romain Marcadier, a software engineer living in Metz, France.

Currently I'm working as a Senior Software Engineer for Datadog, focusing on
[<abbr title="Application Security Management Libraries">ASM</abbr> for Go][dd-asm].

Before that I spent almost 15 years working for Amazon & <abbr title="Amazon Web Services">
AWS</abbr>:
1. Sales & Operations Planning (and Capacity Planning) software for Amazon's european fulfillment
   network, with applications to Amazon's worldwide operations;
2. Product detail page localization as part of Amazon Seller Services;
3. Amazon Logistics Business Intelligence service Amazon's worldwide last-mile operations;
4. [AWS <abbr title="Cloud Development Kit">CDK</abbr>][aws-cdk] &mdash; particularly
   [_jsii_][aws-jsii], the technology that supports CDK's multi-language support.

You can find me on <a class="icon-link" href="https://hachyderm.io/@Romain">{% icon "mastodon" %}
Hachyderm.io</a>, <a class="icon-link" href="https://github.com/RomainMuller">{% icon "github" %}
GitHub</a>, or <a href="#contact">contact me directly</a>.

[dd-asm]: https://docs.datadoghq.com/security/application_security/
[aws-cdk]: https://github.com/aws/aws-cdk
[aws-jsii]: https://github.com/aws/jsii

# Blog

{% if collections.post.length > mostRecentCount -%}
Here are the {{ mostRecentCount }} most recent articles published on this blog:
{%- endif %}

<table class="blog-posts">
   <tbody>
      {% for post in collections.post | reverse %}
      {%- if loop.index0 < mostRecentCount -%}
      <tr class="blog-post">
         <td class="title"><span><a class="icon-link" href="{{ post.url | url }}">{% icon post.data.icon %}{{ post.data.title }}</a></span></td>
         <td class="date">{% date post.date %}</td>
      </tr>
      {%- endif -%}
      {% endfor %}
   </tbody>
</table>

{%- if collections.post.length > mostRecentCount -%}
I have been blogging since 2013, all posts can be found <a href="/blog">here</a>.
{%- endif %}

# Contact

Besides the social media handles listed in [About](#about), you can reach me at
[me@romainmuller.dev](mailto:me@romainmuller.dev). You can also send me
encrypted (or signed) mail using any of the addresses listed on my (un-expired)
PGP keys, which are registered on <a class="icon-link" href="https://keybase.io/RomainMuller">
{% icon "key" %}Keybase</a>, which would be the identities linked to:
- <a class="icon-link" href="https://keybase.io/romainmuller/pgp_keys.asc?fingerprint=882a50770612d2030779ce4b4839f8d9266f42f2">
  {% icon "house-heart-fill" %}<tt>0x882A50770612D2030779CE4B4839F8D9266F42F2</tt></a> for personal dealings
- <a class="icon-link" href="https://keybase.io/romainmuller/pgp_keys.asc?fingerprint=5e8765091530d7d58f043626752ea596354c3ae3">
  {% icon "briefcase-fill" %}<tt>0x5E8765091530D7D58F043626752EA596354C3AE3</tt></a> for contacts related to my work at Datadog
