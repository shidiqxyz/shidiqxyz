---
title: "Proses Hari ke 112"
date: "2026-04-05 09:33"
category: "proses"
tags: []
description: "Masih AI Ethics."
draft: false
---

![amimir](./amimir-mimir.gif?width=600&align=center)

## Notes


What is explainability?

Learning objectives:
- Describe explainability
- Describe interpretability
- Compare interpretability and explainability

Both explainability and interpretability are ways to understand how the model works.

Interpretability is the degree to which an observer can understand the cause of a decision. It is the success rate that humans can predict the result of an AI output, while explainability goes a step further and looks at how the AI system arrived at a result.

What is transparency?

Learning objectives:
- Define transparency
- Describe governance
- Identify business roles and the aspects of transparency they are involved in

Transparency
is disclosing information related to the data used for building AI systems, decisions made throughout the process, model creation, model evaluation and model deployment.

Governance
ensure the process followed during the creation and deployment follows the internal policies and regulations.

What is privacy?

Learning objectives:
- Identify personal information
- Identify sensitive personal information
- Recognize model anonymization
- Describe differential privacy
- Explain data minimization

Data privacy != AI Privacy

Privacy

Personal information (PI)  is any information relating to an identified or identifiable individual, like a name or postal code. 

Sensitive personal information (SPI) is information that, if compromised, could be misused to significantly harm or inconvenience an individual, like a bank account number or birth date.

one type of privacy attack: 

membership inference attack. In a membership inference attack, an attacker tries to determine whether a specific individual was part of the training data set.

Privacy control:

- Model anonymization (before training)
- Diffrential privacy (before training)
- Data minimization (after training)

Key points to remember
The key learning points for each of the five pillars of ethical AI are included below:

1. Fairness

- In AI, fairness is the equitable treatment of individuals or groups of individuals.
- Fairness is achieved when unwanted bias is mitigated.
- Protected attributes separate populations into groups.
- Groups that traditionally receive more favorable outcomes are called privileged groups.
- Groups that traditionally receive less or no favorable outcomes are called unprivileged groups.
- There isn’t a defined set of protected attributes.
- Bias is a systematic error that, intentionally or not, might generate unfair decisions.

2. Robustness

- A robust AI system can effectively handle exceptional conditions, like abnormalities in input or malicious attacks, without causing unintentional harm.
- Adversarial attacks are intentionally carried out on AI systems to accomplish a malicious end goal by exploiting AI system vulnerabilities.
- Two types of adversarial attacks are poisoning and evasion.

3. Explainability

- AI systems are explainable when everyday people, who do not have any special training in AI, can understand how and why the system came to a particular prediction or recommendation.
- Interpretability is the degree to which an observer can understand the cause of a decision.
- Explainability looks at how the AI system arrived at the result.

4. Transparency

- Transparency is disclosing information related to the data used for building AI systems, design decisions made throughout the process, model creation, model evaluation, and model deployment.
- Governance ensures the process followed during the creation and deployment follows the internal policies.

5. Privacy

- Personal and sensitive personal information can be used to train models, as long as privacy techniques are applied to the data to preserve the privacy of individuals whose data is included.
- Many privacy techniques that can be applied to fortify AI against potential breaches of personal or sensitive data. Two that occur during model training are model anonymization and differential privacy. One that occurs after model training is data minimization.
