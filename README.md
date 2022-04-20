# JMESPath Community Site

[![gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/jmespath/chat)

This is the repo for the community website: https://jmespath.site. This is a reworking of the official
website: https://jmespath.org

Join us on our [Gitter channel](https://gitter.im/jmespath/chat).

## Overview

This site is a static website based on the Hugo static site generator. The custom theme provides two custom code blocks that
can be included in markdown, and an interactive JMESPath editor to demo examples. 
See [themes/jmespath/README.md](themes/jmespath/README.md) for more information about how to use or edit the theme.

The [main template](layouts/index.html) expects the `jmespath.spec.git` and `jmespath.spec.wiki.git` repos to be cloned into `content/spec`
and `content/wiki` respectively before building. These are not tracked as git submodules as there is no specific commit
to track within those repos for any build of this site. This template is responsible for rendering the entire page, calling out to partials provided by the theme.
Hugo uses this template to render `content/_index.md`.

The only content contained within this repo is the main introduction content in [content/_index.md](content/_index.md).
All other content is derived from the `jmespath.spec.git` and `jmespath.spec.wiki.git` repos.

## Build

This site is configured to build relative to a tag in the `jmespath.spec.git` repo. The spec repo is configured to
automatically trigger a rebuild upon tagging. You can manually initiate a rebuild of the site for a tag by going to
the `Actions` tab of this repo.

## Development

[Install Hugo](https://gohugo.io/getting-started/installing/).

Clone this repo, and the `jmespath.spec.git` and `jmespath.spec.wiki.git` repos as described above:
```bash
git clone git@github.com:jmespath-community/jmespath.site.git
cd jmespath.site
git clone --depth 1 https://github.com/jmespath-community/jmespath.spec.git content/spec
git clone --depth 1 https://github.com/jmespath-community/jmespath.spec.wiki.git content/wiki
```

Download the JMESPath CLI:
```bash
curl -L https://github.com/jmespath/jp/releases/download/0.2.1/jp-linux-amd64 --output jp
chmod +x jp
```

Start the development server:
```bash
ncat -lk -p 8000 -e ".github/workflows/jp_service.sh" &
hugo server
```

Alternatively, you can avoid installing Hugo and run within Docker via:
```bash
docker run --rm --net=host -v $(pwd):/src klakegg/hugo server
```
