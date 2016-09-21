 'use strict';
  function AppViewModel(){
        var self=this;
        self.isbn=ko.observable();
        self.title=ko.observable();
        self.author=ko.observable();
        self.price=ko.observable();
        self.newauthorform=ko.observable(false);
        self.newbookform=ko.observable(false)
        self.newempid=ko.observable();
        self.newname=ko.observable();
        self.newemail=ko.observable();
        self.newwebsite=ko.observable();
        self.newdepartment=ko.observable();
        self.newskills=ko.observableArray(['HTML','CSS','Java','Node.js','Angular.js','Knockout js','JavaScript','JQuery','C','C++','Python','MATLAB','React.js','Backbone','Go']);
        self.newskills2=ko.observableArray([]);
        self.visibility_main=ko.observable(true);
        self.visibility_main_author=ko.observable(false);
        self.visibility=ko.observable(false);
        self.visibility2=ko.observable(false);
        self.visibility3=ko.observable(false);
        self.visibility4=ko.observable(false);
        self.buttoncontainer=ko.observable(true);
        self.isbnmessage=ko.observable();
        self.titlemessage=ko.observable();
        self.authormessage=ko.observable();    
        self.pricemessage=ko.observable();
        self.availableOnmessage=ko.observableArray([]);
        self.empid=ko.observable();
        self.name=ko.observable();
        self.email=ko.observable();
        self.website=ko.observable();
        self.department=ko.observable();
        self.skillsmessage=ko.observableArray([]);
        self.skills=ko.observableArray(['HTML','CSS','Java','Node.js','Angular.js','Knockout js','JavaScript','JQuery','C','C++','Python','MATLAB','React.js','Backbone','Go']);
        self.skills2=ko.observableArray([]);
        self.authorlist=ko.observableArray();
        self.data=ko.observableArray([]);
        self.author=ko.observableArray([]);
        self.employeedetails=ko.observable();
        self.newbookisbn=ko.observable();
        self.newbooktitle=ko.observable();
        self.newbookauthor=ko.observable();
        self.newbookprice=ko.observable();
        self.newbookavailableOn=ko.observableArray(['Amazon','Flipkart','eBay','Snapdeal','Google','Ebay']);
        self.newbookavailableOn2=ko.observableArray([]);
        self.availableOn=ko.observableArray(['Amazon','Flipkart','eBay','Snapdeal','Google','Ebay']);
        self.availableOn2=ko.observableArray([]);
      
         $.ajax({
                url:"http://172.27.12.104:3000/book/list",
                dataType:"json",
                type:"GET",
                success:function(data){
                    self.data(data);

                          }    
                    });

         $.ajax({
                url:"http://172.27.12.104:3000/author/list",
                dataType:"json",
                type:"GET",
                success:function(data){
                    self.author(data);

                          }    
                    });

        self.showbyisbn= function(data){
                    self.visibility(true);
                    self.visibility_main(false);
                    self.buttoncontainer(false);
                    var author= ko.observable({"isbn" : data.isbn});
                    $.ajax({
                   
                       url:"http://172.27.12.104:3000/book/byisbn",
                       dataType:"json",
                       data: ko.toJSON(author),
                       headers:{
                        'Content-Type':'application/json'
                       },
                       type:"POST",
                       success:function(result){
                           console.log(result);
                            self.employeedetails(data);
                            self.isbnmessage(result.isbn);
                            self.titlemessage(result.title);
                            self.authormessage(result.author);
                            self.pricemessage(result.price);
                            self.availableOnmessage(result.availableOn);
                      }
                    }); 
                }
         
        self.showbyname=function(data){
                    self.visibility2(true);
                    self.visibility_main(false);
                    self.visibility_main_author(true);
                    self.buttoncontainer(false);
                    var author= ko.observable({"name" : ko.toJS(data.author)});
                    $.ajax({
                   
                       url:"http://172.27.12.104:3000/author/byname",
                       dataType:"json",
                       data: ko.toJSON(new author()),
                       headers:{
                        'Content-Type':'application/json'
                       },
                       type:"POST",
                       success:function(result){
                           self.empid(result.empid);
                           self.name(result.name);
                           self.email(result.email);
                           self.skillsmessage(result.skills);
                       }
                    });    
                } 
   
        self.addnewbookbutton= function(){
                   self.visibility_main(false);
                   self.newbookform(true);
                   self.buttoncontainer(false);
                   self.newauthorform(false);
                   self.visibility2(false);
                   self.visibility4(false);
                   self.visibility(false);  
                }

        self.addnewbook= function(){
                    var newbook= {"isbn": self.newbookisbn,
                                 "title": self.newbooktitle,
                                 "author": self.newbookauthor,
                                 "price": self.newbookprice,
                                 "availableOn": self.newbookavailableOn2
                             };
                    $.ajax({
                   
                       url:"http://172.27.12.104:3000/book/new",
                       dataType:"json",
                       data: newbook,
                       type:"POST",
                       success:function(data){
                           alert(data.message);
                          }
                    });  
                    location.reload();
                }

        self.addnewauthorbutton=function(){
                    self.visibility_main(false);
                    self.newauthorform(true);
                   // self.visibility3(false);
                    self.newbookform(false);
                    self.buttoncontainer(false);
                }
            
        self.addnewauthor=function(){                         
                    //Add New Author button at the top
                    var newauthor= {"empid" : self.newempid,
                                 "name" : self.newname,
                                 "email" : self.newemail,
                                 "website" : self.newwebsite,
                                 "department" : self.newdepartment,
                                 "skills" : self.skillsmessage};
                    $.ajax({
                        url:"http://172.27.12.104:3000/author/new",
                        dataType:"json",
                        data:newauthor,
                        type:"POST",
                        success:function(result){
                           alert(result.message);
                          }
                    });
                    location.reload();    
                }

       

        self.isbnupdate=function(){
                    self.visibility3(true);
                    self.visibility_main(false);
                    self.visibility(false);
                    self.buttoncontainer(false);
                }

        self.isbndelete=function(){
                     var deletebook={"isbn" : self.isbnmessage,
                                         "title" : self.titlemessage,
                                         "author" : self.authormessage,
                                         "price" : self.pricemessage,
                                         "availableOn": self.availableOn};
                    $.ajax({
                       url:"http://172.27.12.104:3000/book/remove",
                       dataType:"json",

                       data: deletebook,
                       type:"DELETE",
                       success:function(result){
                         alert(result.message);
                         }
                    });
                    location.reload();
                    self.visibility3(false);
                    self.visibility_main(true);
                    self.visibility(false);
                    self.buttoncontainer(false);
                }

        self.isbnsave=function(){
                     var updatedbook= {"isbn" : self.isbnmessage,
                                  "title" : self.titlemessage,
                                  "author" : self.authormessage,
                                  "price" : self.pricemessage,
                                  "availableOn" : self.availableOnmessage};
                    $.ajax({
                       url:"http://172.27.12.104:3000/book/update",
                       dataType:"json",   
                       type:"PUT",                
                       data: updatedbook,
                     //  contentType: 'application/json', 
                       success:function(result){
                         alert(result.message);
                         //console.log(self.availableOnmessage);
                           }
                    });
                    location.reload();
                    self.visibility3(false);
                    self.visibility_main(true);
                    self.visibility(false);
                    self.buttoncontainer(true);
                }
        
        self.authorupdate=function(){
                    self.visibility4(true);
                    self.visibility_main(false);
                    self.visibility2(false);
                    self.buttoncontainer(false);
                }

        self.authordelete=function(){
                    var deletebook={"empid" : self.empid};
                    $.ajax({
                       url:"http://172.27.12.104:3000/author/remove",
                       dataType:"json",
                       data: deletebook,
                       type:"DELETE",
                       success:function(result){
                        alert(result.message);
                        }
                    });
                    location.reload();
                    self.visibility4(false);
                    self.visibility_main(true);
                    self.visibility2(false);
                    self.buttoncontainer(true);
                }

        self.authorsave=function(){
                     var updatedauthor= {"empid" : self.empid,
                                         "name" : self.name,
                                         "email" : self.email,
                                         "skills" : self.skillsmessage};
                    $.ajax({
                       url:"http://172.27.12.104:3000/author/update",
                       dataType:"json",
                       data: updatedauthor,
                       type:"PUT",
                       success:function(result){
                        alert(result.message);
                        }
                    });
                    location.reload();
                    self.visibility4(false);
                    self.visibility_main(true);
                    self.visibility2(false);
                    self.buttoncontainer(true);
                }
              
        }
         
         ko.applyBindings(new AppViewModel());