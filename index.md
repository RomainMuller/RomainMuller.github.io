---
layout: base
changefreq: weekly
eleventyImport:
   collections: [post]
mostRecentCount: 10
---
<img class="float-end rounded-xl shadow"
   alt="A picture of myself, wearing a gray hat and a black T-shirt with the quote “I'm pickle Rick“ from the show Rick & Morty."
   width="214" height="321"
   srcset="/img/me.jpg, /img/me@x2.jpg 2x"
   src="/img/me.jpg" />

# About

Hi, I am Romain Marcadier, software engineer living in Metz, France.

I'm a <abbr title="my gender identity corresponds to my sex assigned at birth">cisgender</abbr> man,
hapily married to my husband since 2014.

Currently I'm working as a Senior Software Engineer for Datadog, focusing on
[<abbr title="Application Security Management Libraries">ASM</abbr> for Go][dd-asm].

Before that I spent almost 15 years working for Amazon & <abbr title="Amazon Web Services">
AWS</abbr>:
* <span class="rounded-lg border border-green-900 bg-green-800 text-white px-1">2008-2012</span> Sales & Operations Planning (and Capacity
  Planning) software for Amazon's european fulfillment network, with applications to Amazon's
  worldwide operations;
* <span class="rounded-lg border border-green-900 bg-green-800 text-white px-1">2012-2014</span> Product detail page localization as part of
  Amazon Seller Services;
* <span class="rounded-lg border border-green-900 bg-green-800 text-white px-1">2014-2018</span> Amazon Logistics Business Intelligence
  service for Amazon's worldwide last-mile operations;
* <span class="rounded-lg border border-green-900 bg-green-800 text-white px-1">2018-2023</span>
  [AWS <abbr title="Cloud Development Kit">CDK</abbr>][aws-cdk] &mdash; particularly
  [_jsii_][aws-jsii], the technology that supports CDK's multi-language support.

I have a French Masters/Engineering degree from [Télécom Nancy][tn] (formerly known as
<abbr title="Ecole Supérieure d'Informatique et Applications de Lorraine">ESIAL</abbr>), majoring in
*Computer Science* and *Software Engineering*.

Besides this I enjoy cooking and baking (in particular, baking brioches), watching movies (plot is
more important to me than visual effects), TV series (big fan of the BBC's *Doctor Who*), and
photography (my gear is built around a *Canon EOS 70D*).

You can find me on [{% icon "mastodon" %}&nbsp;Hachyderm.io][hachyderm],
[{% icon "github" %}&nbsp;GitHub][gh], [{% icon "linkedin" %}&nbsp;LinkedIn][linkedin], or [contact me directly](#contact).

[dd-asm]: https://docs.datadoghq.com/security/application_security/
[aws-cdk]: https://github.com/aws/aws-cdk
[aws-jsii]: https://github.com/aws/jsii
[tn]: https://telecomnancy.univ-lorraine.fr/
[hachyderm]: https://hachyderm.io/@Romain
[gh]: https://github.com/RomainMuller
[linkedin]: https://www.linkedin.com/in/romainmuller/

# Blog

{% if collections.post.length > mostRecentCount -%}
Here are the {{ mostRecentCount }} most recent articles published on this blog:
{%- endif %}

<table class="plain border-separate w-full mt-[-0.5em] mb-[1em]">
   <tbody>
      {% for post in collections.post | reverse %}
      {%- if loop.index0 < mostRecentCount -%}
      <tr class="leading-[1.5em]" itemprop="blogPosts" itemscope itemtype="http://schema.org/BlogPosting">
         <td class="border-b-[2px] border-dotted border-gray-400">
            <span class="bg-white pr-[20px] relative left-[-1px] bottom-[-0.5em]"><a href="{{ post.url | url }}">{% icon post.data.icon %}&nbsp;{{ post.data.title }}</a></span>
         </td>
         <td class="text-right w-[12ch]">{% date post.date, "short", "relative", "bottom-[-0.5em]" %}</td>
      </tr>
      {%- endif -%}
      {% endfor %}
   </tbody>
</table>

{%- if collections.post.length > mostRecentCount -%}
I have been blogging since 2013, all posts can be found <a href="/blog">here</a>.
{%- endif %}

# Speaking & More
<table class="plain border-separate w-full mt-[-0.5em] mb-[1em]">
   <tbody>
      <tr class="leading-[1.5em]">
         <td class="border-b-[2px] border-dotted border-gray-400">
            <span class="bg-white pr-[20px] relative left-[-1px] bottom-[-0.5em]">
               <a href="https://aws.amazon.com/fr/blogs/opensource/how-the-jsii-open-source-framework-meets-developers-where-they-are/">{% icon "amazon" %}&nbsp;How the jsii open source framework meeds developers where they are</a>
            </span>
         </td>
         <td class="text-right w-[12ch]"><time class="relative bottom-[-0.5em]" datetime="2020-12-23">Dec 23, 2020</time></td>
      </tr>
      <tr class="blog-post">
         <td class="border-b-[2px] border-dotted border-gray-400">
            <span class="bg-white pr-[20px] relative left-[-1px] bottom-[-0.5em]">
               <a href="https://www.twitch.tv/aws/video/944565768">{% icon "twitch" %}&nbsp;CDK Construction Zone | S1 Ep3 | CDK Triggers Part 3 (final)</a>
            </span>
         </td>
         <td class="text-right w-[12ch]"><time class="relative bottom-[-0.5em]" datetime="2021-03-09">Mar 9, 2021</time></td>
      </tr>
      <tr class="blog-post">
         <td class="border-b-[2px] border-dotted border-gray-400">
            <span class="bg-white pr-[20px] relative left-[-1px] bottom-[-0.5em]">
               <a href="https://www.twitch.tv/aws/video/960287598">{% icon "twitch" %}&nbsp;CDK Construction Zone | S1 Ep4 | Tokens</a>
            </span>
         </td>
         <td class="text-right w-[12ch]"><time class="relative bottom-[-0.5em]" datetime="2021-03-23">Mar 23, 2021</time></td>
      </tr>
      <tr class="blog-post">
         <td class="border-b-[2px] border-dotted border-gray-400">
            <span class="bg-white pr-[20px] relative left-[-1px] bottom-[-0.5em]">
               <a href="https://www.twitch.tv/aws/video/1019059654">{% icon "twitch" %}&nbsp;CDK Construction Zone | S1 Ep7 | Season finale, CDK Tips</a>
            </span>
         </td>
         <td class="text-right w-[12ch]"><time class="relative bottom-[-0.5em]" datetime="2021-11-05">Nov 5, 2021</time></td>
      </tr>
      <tr class="blog-post">
         <td class="border-b-[2px] border-dotted border-gray-400">
            <span class="bg-white pr-[20px] relative left-[-1px] bottom-[-0.5em]">
               <a href="https://www.youtube.com/watch?v=CdMtBLVqhz8">{% icon "youtube" %} The Wingly Update EP 10</a>
            </span>
         </td>
         <td class="text-right w-[12ch]"><time class="relative bottom-[-0.5em]" datetime="2023-05-30">May 30, 2023</time></td>
      </tr>
   </tbody>
</table>

# Contact

Besides the social media handles listed in [About](#about), you can reach me at
[me@romainmuller.dev](mailto:me@romainmuller.dev). You can also send me
encrypted (or signed) mail using any of the addresses listed on my (un-expired)
PGP keys, which are registered on <a href="https://keybase.io/RomainMuller">
{% icon "key" %}&nbsp;Keybase</a>, which would be the identities linked to:
- <a href="https://keybase.io/romainmuller/pgp_keys.asc?fingerprint=882a50770612d2030779ce4b4839f8d9266f42f2">
  {% icon "house-heart-fill" %}&nbsp;<code>0x4839&nbsp;F8D9&nbsp;266F&nbsp;42F2</code></a> for personal dealings
- <a href="https://keybase.io/romainmuller/pgp_keys.asc?fingerprint=5e8765091530d7d58f043626752ea596354c3ae3">
  {% icon "briefcase-fill" %}&nbsp;<code>0x752E&nbsp;A596&nbsp;354C&nbsp;3AE3</code></a> for contacts related to my work at Datadog
