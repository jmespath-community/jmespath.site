FROM klakegg/hugo:0.107.0-ext-ubuntu-ci

RUN apt-get update \
 && apt-get install -y curl nmap ncat \
 && curl -L https://github.com/jmespath-community/jp/releases/download/v1.1.0/jp-linux-amd64 --output /usr/local/bin/jp \
 && chmod +x /usr/local/bin/jp \
 && ln -s /usr/local/bin/jp /src/jp

COPY ./.devcontainer/start.sh /start.sh
RUN chmod +x /start.sh

ENV HUGO_EDITON extended
ENV HUGO_VERSION_OVERRIDE 0.97.0
ENV HUGO_VERSION 0.97.0

CMD [ "sleep", "365d" ]
