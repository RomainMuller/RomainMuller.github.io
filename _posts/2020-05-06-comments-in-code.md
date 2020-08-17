---
categories: [programming, opinion]
date: 2020-05-06T15:26+0200
title: Why I don't like commenting code
---

Sometimes, the comments are intended as *documentation*. As a matter of fact,
many programming languages use specially formatted comments to represent API
documentation (e.g: `javadoc` processes comments in *Java* code introduced by
`/**`). Such comments are invaluable in making sure users of a library or API
are not forced to look into the implementation of a feature to understand it's
purpose, valid uses, limitations, etc... They inform about the *contract* the
feature offers, not about how the contract is fulfilled.

But the comments I dislike are not those. They are the breadcrumbs left within
the implementation of the features. Those are the explanations you need to
understand some obscure idiom, because the code suffers from a lack of
readability. See - I am of those people who consider *source code* is the only
reliable source of information about what a program **really** does. What the
code was **meant** to do is spelled out in the *contract* that was documented
outside of the implementation; but when you try to understand a bug, you need to
gain insight into how the real behavior differs from the intended behavior.

The sad truth about documentation is that it becomes *stale* really quickly. In
fact, one can see it as a snapshot of the maintainers' intention when it was
written. But requirements evolve. Bugs are discovered and fixed... And it is so
easy to forget to update the documentation to reflect the new state of affairs.

Now, you'd ask me what it is I don't like about comments inserted in the
implemntation, which are supposedly there to help me understand the **real**
behavior of the program? Well the problem is that it's a form of documentation.
Reality will eventually drift away from what is expressed in this comment. And
there I am, trying to troubleshoot a bug. And I have two sources of information
in the source:

- Comments, which tell me someting
- Source code, which tells me something else

Now, which is right? Is the comment telling me how things should be, and the
implementation is, in fact, broken? Or is the source code correct and the
comment is simply stale (and should be fixed or removed)? At this point, the
source code is the only thing I have which is grounded in reality - it
represents what is being executed by computers.

If the code is not readable enough that it can be understood by the reader, it
should be refactored for readability. Are explanations needed because the
contract for this feature is too complicated? Breaking it down into smaller
units will help clarifying the situation and remove the need for implementation
comments.

Is the code unreadable? Convoluted idioms should only be used when abolutely necessary: development constraints (performance requirements, security, ...)
force developers to write code that is either not very readable or that looks
unnecessarily complicated... The constraints that informed the implementation
choice should be spelled out in the *contract* documentation.

But if all documentation eventually becomes *stale*, what's so different about
*contract* documentation? Well not much. But this is one of those things where
*less is more*. The more places documentation is maintained in, the faster they
will diverge from reality. It becomes much easier to stay on top of of
documentation when there is only one palce where it is mastered. *Contracts* are
documented close to their implementation. So it's easy to update the
*documentation* when the contract changes. And changing a *contract* should be
done with care: anything that subscribed to this *contract* could be affected by
the change.

So basically, my stance on commenting code is that *all* public APIs should have
their *contract* documented in-place. Ideally, private members that are not
trivial should receive the same treatment. And inline comments in the
implementation should only be used when they explain someting counter-intuitive
about the implementation.
