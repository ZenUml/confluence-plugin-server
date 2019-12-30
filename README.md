# Confluence-Plugin-Server
The ZenUML plugin for Confluence Server

# Local development

Clone this repository.

Install Atlassian SDK: https://developer.atlassian.com/server/framework/atlassian-sdk/install-the-atlassian-sdk-on-a-linux-or-mac-system/

Run `$ atlas-run` from the root folder

# Installation
1. package : `atlas-mvn package`
1. locate package : 
    * `target/sequence-version-SNAPSHOT.jar`
    
    or
    * `target/sequence-version-SNAPSHOT.obr`
1. start local confluence-server `docker-compose up confluence`
1. navigate to market place > manage apps > upload app
