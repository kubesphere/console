# Contributing to KubeSphere Console

The following is a set of guidelines for contributing to KubeSphere Console. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

Table Of Contents

[Code of Conduct](#code-of-conduct)

[How Can I Contribute?](#how-can-i-contribute)

- [Reporting Bugs](#reporting-bugs)
- [Pull Requests](#pull-requests)

[Style Guides](#style-guides)

- [Git Commit Messages](#git-commit-messages)
- [JavaScript Styleguide](#javascript-styleguide)

## Code of Conduct

All members of the KubeSphere community must abide by [Code of Conduct](docs/code-of-conduct.md). Only by respecting each other can we develop a productive, collaborative community.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for KubeSphere Console. Following these guidelines helps the maintainers and community understand your report, reproduce the behavior, and find related reports.

When you are creating a bug report, please fill out [the required template](https://github.com/kubesphere/console/blob/master/.github/ISSUE_TEMPLATE/bug_report.md), the information it asks for helps us resolve issues faster.

#### Before Submitting A Bug Report

- **Check the [FAQs on the docs](https://kubesphere.io/docs/v2.1/zh-CN/faq/faq-console/)** for a list of common questions and problems.
- **Check the [Forum](https://kubesphere.io/forum/)** to see if there is a way to resolve.
- **Perform a [cursory search](https://github.com/kubesphere/console/issues)** to see if the problem has already been reported. If it has, **and the issue is still open**, add a comment to the existing issue instead of opening a new one.

### Pull Requests

The process described here has several goals:

- Maintain KubeSphere Console's quality
- Fix problems that are important to users

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](https://github.com/kubesphere/console/blob/master/.github/PULL_REQUEST_TEMPLATE.md)
2. Follow the [style guides](#style-guides)
3. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing <details><summary>What if the status checks are failing?</summary>If a status check is failing, and you believe that the failure is unrelated to your change, please leave a comment on the pull request explaining why you believe the failure is unrelated. A maintainer will re-run the status check for you. If we conclude that the failure was a false positive, then we will open an issue to track that problem with our status check suite.</details>

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Style Guides

### Git Commit Messages

Follow the [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/).

### JavaScript Styleguide

Follow the [Airbnb Javascript Style Guide](https://github.com/airbnb/javascript#table-of-contents).

This project use Eslint to format code. Check the rules in [.eslintrc.js](./.eslintrc.js)

### CSS, SCSS Styleguide

Using Prettier to format css and scss files. Check the rules in [.prettierrc](./.prettierrc)
