# Confluence-Plugin-Server
The ZenUML plugin for Confluence Server

# Local development

Clone this repository.

Install Atlassian SDK: https://developer.atlassian.com/server/framework/atlassian-sdk/install-the-atlassian-sdk-on-a-linux-or-mac-system/

Run `$ atlas-run` from the root folder

# Local Confluence Server Environment (Docker)
1. Start local confluence-server `docker-compose up confluence`
1. Open `http://localhost:8090/`
1. Create an account and keep your password. 
1. Keep the account and password locally.
1. Remove .data folder if you want to reset the entire server.

# Package 
1. package : `atlas-mvn package`
1. locate package : 
    * `target/sequence-version-SNAPSHOT.jar`
    
    or
    * `target/sequence-version-SNAPSHOT.obr`

# Installation by upload
1. navigate to market place > manage apps > upload app

# Installation from market place.
1. navigate to mange apps->find new apps->search ZenUML->install

# release
1. create new tag on master branch: `git tag -a tag-name release-*** -m "message"` (name can be changed to fit release process). 
1. push tag to remote. `git push origin tag-name`
1. travis ci runs release job for the git tag.
1. artifacts are released in github releases.
