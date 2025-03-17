### Cloudflare-R2-Bucket-With-AWS-SDK-JS-V3

<br>
<strong>
Create/Deploy, Configure, List and Delete Cloudflare R2 Bucket (Object Storage) with AWS SDK for JavaScript/NodeJS V3.
</strong>
<br><br>
The  script can execute the followings:

  1) Create/deploy R2 buckets specified in the JSON input file.
  
  2) Put/Add Lifecycle Configuration to the R2 buckets.
  
  3) List all R2 buckets.

  4) Delete specified R2 buckets.

<br>

### Diagram Depicting R2 Bucket Information and Settings on Cloudflare R2 Console.
![Image description](https://github.com/MongoExpUser/Cloudflare-R2-Bucket-With-AWS-SDK-JS-V3/blob/main/clf-r2.png)

## PURPOSE

* Normally, R2 bucket can be created/deployed, configured, listed and deleted on the Cloudflare console or via Cloudflare CLI (Wrangler). <br>
    
* R2 bucket can also be deployed via AWS SDK in any language of choice, especially for those who: <br>
  1) Are already familiar with AWS SDK and <br>
  2) Want to create, configure, list and delete <strong>large number of buckets </strong> programatically.<br>
    
* <strong>This repository</strong> contains code for creating/deploying, configuring, listing and deleting cloudflare R2 bucket (object storage) via AWS SDK for JavaScript/NodeJS V3, from any computer. <br>
    
* AWS SDK for JavaScript/NodeJS V3 is clean, lightweight, fast and it fully supports the async-await syntax. <br>

* Also, cloudflare R2 bucket has <strong>lower storage cost </strong> and <strong> no egress fee </strong>, which makes it attractive to developers for object storage.
    
    
## RUNNING the NodeJS script

### To run the script, follow these steps:

1) #### Install NodeJS and @aws-sdk/client-s3 (v3) module, assuming Ubuntu OS and NodeJS v21.x
    * sudo apt-get -y update <br>
    * sudo apt-get install -y ca-certificates curl gnupg <br>
    * sudo mkdir -p /etc/apt/keyrings <br>
    * curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg <br>
    * echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_21.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list <br>
    * sudo apt-get -y update <br>
    * sudo apt-get install -y nodejs <br>
    * sudo npm install @aws-sdk/client-s3
    
2) #### Download or clone the following files, from this repo, into the current working directory (CWD): <br>
   * NodeJS script:  index.js <br>
   * JSON file: config.json <br>

3) #### Fill in relevant values in config.json file.<br>
   * <strong>References for config.json </strong>:

4) #### Then run the code, assuming sudo access: <br>
   * sudo node index.js <br><br>


# License

Copyright © 2024. MongoExpUser

Licensed under the MIT license.
   
