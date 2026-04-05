---
title: "Proses Hari ke 111"
date: "2026-04-04 09:05"
category: "proses"
tags: []
description: "AI Ethics."
draft: false
---

![higuruma](./higuruma-facepalm.gif?width=600&align=center)

## Notes

AI Ethics

5 Ethical pillars:
- Fairness
- Robustness
- Explainability
- Transparency
- Privacy

What is AI ethics?

Learning objectives: Identify five pillars of AI Ethics

Fairness is probably obvious it is to make sure that the models are not behaving in a biased way.

Robustness, you want to make sure that your models behave well in exceptional conditions. How do you make sure that the model performance is good over time? What is happening with the effective data drift?

Privacy, can you make sure that the model, the data, the model that is built off of that model, the insights from that model, they are all that the model builder owns and retains control of those insights. And how do you do this not just as in terms of consumption of the output of the model, but across the life cycle. How do you make sure that data protection rules are in place through the model building testing validation and monitoring stages.

Explainability is probably pretty obvious. How can you explain the behavior of a model.

Transparency, you want to be able to inspect everything about a model. Can you understand all the facts surrounding the model.

What is fairness?

Learning objectives:
- Describe fairness in AI
- Describe protected attributes
- Identify privileged groups and unprivileged groups
- Explain AI bias

Bias

“Bias, in general, is a systematic error, but in the context of fairness, the concern is around unwanted bias. Unwanted bias places some groups or individuals at a systematic advantage and other groups or individuals at a systematic disadvantage.” 

The type of fairness (group, individual, or both) to focus on depends on the problem. Many factors can influence the selection of the protected attributes, such as the organization’s principles, the application’s focus, and regulations.

What is robustness?

Learning objectives:
- Describe adversarial robustness within AI
- Explain how an adversary can influence an AI system
- Categorize adversarial attacks

Adversarial attacks are intentionally carried out on AI systems to accomplish a malicious end goal by taking advantage of AI system vulnerabilities.

two types of adversarial attacks: poisoning and evasion.

poisoning can happen in the following ways during the model training phase:
- Injecting malicious samples into the training data
- Updating features and labels of the training data
- Modifying AI model architecture, parameters, and logic”

Evasion can happen after the model deployment phase in the following ways:
- Sending malicious test samples to the deployed model
- Corrupting test data sent to the deployed model
