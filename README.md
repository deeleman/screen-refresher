#Automatic Screen Refresher

Sometimes we might need to monitor different dashboards or charts in an recurrent fashion and display each one of those screens in a room display monitor or TV. In this scenario, we might feel tempted to open several browser tabs or either go switching manually to each different dashboard every now and then. This is a drag, but here it comes Javascript to the rescue!

**Automatic Screen Refresher** is a small utility built on top of Angular that allows any user to easily configure a set of URLs that will rotate on the screen after a time interval also configured by the user (default is 10000 milliseconds = 10 seconds).

This is a very simple script that I built to help my fellow DevOp buddies from [Casumo](http://www.casumo.com) keeping track of different system dashboards in the control room TV. 

## Installation
Clone this repository onto the machine that will host the broadcast app and then open the settings file available at ```config/settings.json```. **This is the only file that will require tweaking**. For your convenience, a template file named ```template.json``` with the same kickstart example has been added to this folder in case you require future reference.

The JSON configuration is pretty straightforward. Only two settings are available:

* **timeout** (optional - remove it in order to leverage thedefault refresh interval): The amount of milliseconds before refreshing the screen and displaying the next one.
* **urls** (required): An array containing the different URLs we want to display iteratively in our broadcast system.

### Example

````
{
    "timeout": 8000,
    "urls": [
        "http://www.timesofmalta.com",
        "http://www.casumo.com",
        "http://m.casumo.com",
        "http://www.casumoaffiliates.com"
    ]
}
````

Please make sure the file is in valid JSON format before saving it. The use of a [JSON validator](http://jsonlint.com/) is advised. No further configuration is required beyond this point.

### Warning
Certain URLs will cause an exception, invalidating the whole application sometimes. Those third party sites which are configured with the ``X-Frame-Options`` HTTP header set to either ``DENY`` or ``SAMEORIGIN`` (eg. Google and other big guys in the industry) cannot be consumed form inside an iframe and therefore will turn into an exception.

## Execution

Once you have successfully configured all the URLs you want to consume and display successively in the host TV or display monitor set, save everything and execute the app under a HTTP server. **Tip:** Executing the following command at the app folder in a box provided with Python will spawn a simple web server.

``$ python -m SimpleHTTPServer 8000``

You can edit the URLs or refresh timeout configured at the file and have the changes immediately available by refreshing the browser. 

When executing the URL switch, the system do not perform a new GET of content, so no more traffic is generated.

----------
# License - "BSD License" #

Copyright (c) 2015, Pablo Deeleman
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.




