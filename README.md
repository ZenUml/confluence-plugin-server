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

# release
1. create new tag on master branch: `git tag -a tag-name release-*** -m "message"` (name can be changed to fit release process). 
1. push tag to remote. `git push origin tag-name`
1. travis ci runs release job for the git tag.
1. artifacts are released in github releases.