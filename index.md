---
layout: base
changefreq: weekly
eleventyImport:
   collections: [post]
mostRecentCount: 10
---
<img class="col-3 float-end shadow-sm rounded-4" src="/img/me.jpg" />

# About

Hi, I am Romain Marcadier, a software engineer living in Metz, France.

Currently I'm working as a Senior Software Engineer for Datadog, focusing on
[<abbr title="Application Security Management Libraries">ASM</abbr> for Go][dd-asm].

Before that I spent almost 15 years working for Amazon & <abbr title="Amazon Web Services">
AWS</abbr>:
* <span class="badge text-bg-success">2008-2012</span> Sales & Operations Planning (and Capacity
  Planning) software for Amazon's european fulfillment network, with applications to Amazon's
  worldwide operations;
* <span class="badge text-bg-success">2012-2014</span> Product detail page localization as part of
  Amazon Seller Services;
* <span class="badge text-bg-success">2014-2018</span> Amazon Logistics Business Intelligence
  service for Amazon's worldwide last-mile operations;
* <span class="badge text-bg-success">2018-2023</span>
  [AWS <abbr title="Cloud Development Kit">CDK</abbr>][aws-cdk] &mdash; particularly
  [_jsii_][aws-jsii], the technology that supports CDK's multi-language support.

I have a French Masters/Engineering degree from [Télécom Nancy][tn] (formerly known as
<abbr title="Ecole Supérieure d'Informatique et Applications de Lorraine">ESIAL</abbr>), majoring in
*Computer Science* and *Software Engineering*.

Besides this I enjoy cooking and baking (in particular, baking brioches), watching movies (plot is
more important to me than visual effects), TV series (big fan of the BBC's *Doctor Who*), and
photography (my gear is built around a *Canon EOS 70D*).

You can find me on <a href="https://hachyderm.io/@Romain">{% icon "mastodon" %}&nbsp;Hachyderm.io</a>,
<a href="https://github.com/RomainMuller">{% icon "github" %}&nbsp;GitHub</a>, or <a href="#contact">contact me
directly</a>.

[dd-asm]: https://docs.datadoghq.com/security/application_security/
[aws-cdk]: https://github.com/aws/aws-cdk
[aws-jsii]: https://github.com/aws/jsii
[tn]: https://telecomnancy.univ-lorraine.fr/

# Blog

{% if collections.post.length > mostRecentCount -%}
Here are the {{ mostRecentCount }} most recent articles published on this blog:
{%- endif %}

<table class="blog-posts">
   <tbody>
      {% for post in collections.post | reverse %}
      {%- if loop.index0 < mostRecentCount -%}
      <tr class="blog-post">
         <td class="title"><span><a href="{{ post.url | url }}">{% icon post.data.icon %}&nbsp;{{ post.data.title }}</a></span></td>
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
PGP keys, which are registered on <a href="https://keybase.io/RomainMuller">
{% icon "key" %}&nbsp;Keybase</a>, which would be the identities linked to:
- <a href="https://keybase.io/romainmuller/pgp_keys.asc?fingerprint=882a50770612d2030779ce4b4839f8d9266f42f2">
  {% icon "house-heart-fill" %}&nbsp;<tt>0x4839&nbsp;F8D9&nbsp;266F&nbsp;42F2</tt></a> for personal dealings
- <a href="https://keybase.io/romainmuller/pgp_keys.asc?fingerprint=5e8765091530d7d58f043626752ea596354c3ae3">
  {% icon "briefcase-fill" %}&nbsp;<tt>0x752E&nbsp;A596&nbsp;354C&nbsp;3AE3</tt></a> for contacts related to my work at Datadog