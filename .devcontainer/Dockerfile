FROM klakegg/hugo:0.95.0-ext-ubuntu-ci

RUN apt-get update \
 && apt-get install -y curl nmap \
 && curl -L https://github.com/jmespath/jp/releases/download/0.2.1/jp-linux-amd64 --output /usr/local/bin/jp \
 && chmod +x /usr/local/bin/jp \
 && ln -s /usr/local/bin/jp /src/jp

COPY ./.devcontainer/start.sh /start.sh
RUN chmod +x /start.sh

ENV HUGO_EDITON extended
ENV HUGO_VERSION_OVERRIDE 0.97.0
ENV HUGO_VERSION 0.97.0

## To build this image, the following incorrect command was run:
## `hugo gen autocomplete > /etc/bash_completion.d/hugo.sh`
## (see https://github.com/klakegg/docker-hugo/blob/847a21f53c4074721573bb7e38e3fe61e593755c/src/files/_script/hugo-extended.sh#L48)
## To fix the incorrectly generated file we need to run the following command instead:
## `hugo completion bash > /etc/bash_completion.d/hugo.sh` 
##
## Unfortunately, running Hugo for the first time will print "Downloading Hugo 0.97.0" on stdout.
## To prevent this line from being added to the bash_completion script and thus creating a corrupt file,
## we run Hugo a first time to force download to happen.
##
## Once installed, we can run Hugo safely the second time.
## 
RUN hugo --help >/dev/null \
 && hugo completion bash >/etc/bash_completion.d/hugo.sh

CMD [ "sleep", "365d" ]
