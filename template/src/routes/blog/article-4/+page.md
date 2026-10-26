---
title: Maths, CodePen and YouTube Embeds
date: 2026-10-22
description: A sample post showing KaTeX equations and an embedded CodePen.
tags:
  - Development
  - Tutorial
---

Posts can include equations, written in TeX, and live demos from CodePen. Both work with nothing more than Markdown.

## Maths

Wrap inline maths in single dollar signs: the area of a circle is $A = \pi r^2$, and Euler's identity is $e^{i\pi} + 1 = 0$.

Put display maths on its own lines between double dollar signs:

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

Wide equations scroll sideways on small screens:

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6} \qquad
f(x) = a_0 + \sum_{n=1}^{\infty} \left( a_n \cos \frac{n \pi x}{L} + b_n \sin \frac{n \pi x}{L} \right)
$$

## CodePen

Paste a link to a pen on a line of its own and it becomes an embed that follows light and dark mode:

https://codepen.io/chriscoyier/pen/gfdDu

A CodePen link inside a sentence, like [this one](https://codepen.io/chriscoyier/pen/gfdDu), stays a normal link.

## YouTube

In a similar fashion paste a YouTube link on a line of its own and it becomes an embed:

https://www.youtube.com/watch?v=rv3Yq-B8qp4

A YouTube link like [this one](https://www.youtube.com/watch?v=rv3Yq-B8qp4) inside a sentence stays a normal link.
