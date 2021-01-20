import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import xml2js from 'xml2js';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  title: string = 'read-xml'; //this is the title of project
  public xmlItems: any = null; // hold data extracted from xml in [{key:value}]
  fileToUpload: File = null;// hold file uploaded from user
  parser = new xml2js.Parser( // this inital xml to parse file to read
    {
      trim: true,
      explicitArray: true
    });
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //this.loadXML();
  }
  uploadFile(event: any) {
    let fileReader = new FileReader(); //inital file to read 
    fileReader.onload = (e) => {
      //console.log(fileReader.result); // hold binary data and convert it o real data
      this.parseXML(fileReader)
    }
    //fileReader.readAsText(event.target.files[0]);

  }
  //if you read from server
  loadXML(fileDir) {
    this.http.get(fileDir, {
      headers: new HttpHeaders()
        .set("Content-Type", "text/xml")
        .append("Access-Control-Allow-Method", "GET")
        .append("Access-Control-Allow-Origin", "*")
        .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
      responseType: "text"
    }).subscribe(data => {
      this.parseXML(data)
    })
  }
  parseXML(data) {
    var k: string | number, // hold key of parse to object
      arr = []; // hold all tag after convert
    this.parser.parseString(data.result, (err, result) => {
      var obj = result.Employee;
      for (k in obj.emp) {
        var item = obj.emp[k];
        arr.push({
          id: item.id[0],
          name: item.name[0],
          gender: item.gender[0],
          mobile: item.mobile[0]
        });
      }
    });
    arr.length > 0 ? (this.xmlItems = arr) : (this.xmlItems = null)
  }
  //coment
}
