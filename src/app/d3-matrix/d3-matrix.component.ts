import { Component, ElementRef, NgZone, OnDestroy, OnInit,Input,  OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

import {
  D3Service,
  D3,
  Axis,
  BrushBehavior,
  BrushSelection,
  D3BrushEvent,
  ScaleLinear,
  ScaleOrdinal,
  Selection,
  Transition
} from 'd3-ng2-service';

import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import { AlignerService } from '../aligner.service';
import { promise } from 'protractor';

@Component({
  selector: 'app-d3-matrix',
  templateUrl: './d3-matrix.component.html',
  styleUrls: ['./d3-matrix.component.css']
})
export class D3MatrixComponent implements OnInit,OnChanges {

  private d3: D3;
  private serviceResult:any;
  private positionalPairOfApi:any;
  private rawPos:any;
  private saveButtonFlag:boolean = true;
  @Input() BCV:any;

  constructor(element: ElementRef, private ngZone: NgZone, d3Service: D3Service,private service: AlignerService,private _http:Http) {
       this.d3 = d3Service.getD3();
       
  }     


  gridData(d:any,rawPoss:any){
    var xpos =100;
    var ypos =100;
    var width = 35;
    var height= 35;
    var filled;

    var rawpossCount = rawPoss.length;
    for(let index = 0; index < rawpossCount; index ++)
    {
        let rowPossseparatedPair =rawPoss[index].split('-');
          if(rowPossseparatedPair.length === 2)
          {

              if(Number(rowPossseparatedPair[0]) === 255)
              {
                rowPossseparatedPair[0] = 0;
              }

              if(Number(rowPossseparatedPair[1]) === 255)
              {
                rowPossseparatedPair[1] = 0;
              }
          }
          rawPoss[index] = rowPossseparatedPair[0] + "-" + rowPossseparatedPair[1];
    }
    
    this.positionalPairOfApi = d.positionalpairs;
    var positionalPairCount = d.positionalpairs.length;
    let positionalPairOfApiDemo = d.positionalpairs;
    for(let index = 0; index < positionalPairCount; index ++)
    {
        let separatedPair =positionalPairOfApiDemo[index].split('-');
          if(separatedPair.length === 2)
          {

              if(Number(separatedPair[0]) === 255)
              {
                separatedPair[0] = 0;
              }

              if(Number(separatedPair[1]) === 255)
              {
                separatedPair[1] = 0;
              }
          }
          positionalPairOfApiDemo[index] = separatedPair[0] + "-" + separatedPair[1];
    }

    d.greek.unshift('NULL');
    let greekHorizontalWords = d.greek;

    d.hinditext.unshift('NULL');
    let hindiVerticalWords  = d.hinditext; 
    let greekHorizontalExtraWords = ["G53190G53190G53190G53190G53190G53190G53190G53190","G11610G11610G11610G11610G11610G11610G11610G11610G11610","G25400G25400G25400G25400G25400G25400G25400G25400G25400G25400","G23980G23980G23980G23980G23980G23980G23980G23980G23980G23980G23980","G35880G35880G35880G35880G35880G35880G35880G35880G35880G35880G35880","G30560G30560G30560G30560G30560G30560G30560G30560G30560G30560G30560G30560","G08460G08460G08460G08460G08460G08460G08460","G17220G17220G17220G17220G17220G17220G17220","G27820G27820G27820G27820G27820G27820G27820","G37390","G41000","G14730","G25960G25960G25960G25960G25960G25960G25960","G20030G20030G20030G20030G20030G20030G20030","G35880G35880G35880G35880G35880G35880","G49900G49900G49900G49900G49900G49900G49900","G14730G14730G14730G14730G14730G14730G14730G14730G14730","G23160G23160G23160G23160G23160G23160G23160G23160"];

    var data = new Array();
    var rowcount = hindiVerticalWords.length;
    var columncount = greekHorizontalWords.length;
    for(var row =0;row < rowcount; row++)
        {
        data.push(new Array());
        for(var column=0;column < columncount;column++)
            {
            data[row].push({
                x:xpos,
                y:ypos,
                width:width,
                height:height,
                filled:filled,
                positionalPair: row + "-" + column ,// column + "-" + row ,
                positionalPairOfApi : this.positionalPairOfApi,
                greekHorizontalWords: greekHorizontalWords,
                hindiVerticalWords: hindiVerticalWords,
                greekIndexWise: greekHorizontalWords[column] + column + 'column',
                hindiIndexWise: hindiVerticalWords[row] + row + 'row',
                greekHorizontalExtraWords: greekHorizontalExtraWords,
                rawPosss:rawPoss,
                saveButtonFlag:this.saveButtonFlag
            })
            xpos += width;

            }
        xpos = 100;
        ypos += height;

        }

  return data;
}

saveOnClick(){

                  var x:any = this.BCV;
                  var y:any = this.positionalPairOfApi;

                  var z:number = y.length;

                 for(let index = 0; index < z; index ++)
                 {
                     let separatedPair =y[index].split('-');
                       if(separatedPair.length === 2)
                       {
             
                           if(Number(separatedPair[0]) === 0)
                           {
                             separatedPair[0] = 255;
                           }
             
                           if(Number(separatedPair[1]) === 0)
                           {
                             separatedPair[1] = 255;
                           }
                       }
                       y[index] = separatedPair[0] + "-" + separatedPair[1];
                 }
                var data = {"bcv":x,"positional_pairs":y};
          
                   this._http.post('http://127.0.0.1:5000/alignments/edit',data)
                 .subscribe(data=> {  
                     let response:any = data;
                     //console.log(response._body);
                    if(response._body === 'Saved'){
                        alert('Updation has been done successfully.')
                    }
                 })            
}

ngOnInit() {}

ngOnChanges(changes: SimpleChanges) {
  const bookChapterVerse: SimpleChange = changes.BCV;
  this.BCV = bookChapterVerse.currentValue;

      let bcv:any = this.BCV; //40001010;
      var data = new FormData();
      data.append("bcv",bcv);
      this._http.post('http://127.0.0.1:5000/alignments/view',data)
      .subscribe(data => {  
        this.rawPos = data.json().positionalpairs;    
      var that = this;
      let self = this;
       let d3 = this.d3;

       document.getElementById("grid").innerHTML = "";
      
    var gridData = this.gridData(data.json(),this.rawPos);
  
    var grid = d3.select("#grid")
    .append("svg")
    .style("overflow","auto")
    
   var row = grid.selectAll(".row")
   .data(gridData)
   .enter().append("g")
   .attr("class","row");
  
   var upperColumn = row.selectAll(".upperColumn")
   .data(function(d:any){return d;})
   .enter().append("text")
  
   var column = row.selectAll(".square")
   .data(function(d:any){return d;})
   .enter().append("rect")
  
   var columnAttributes = column
   .attr("x",function(d:any){return d.x;})
   .attr("y",function(d:any){return d.y;})
   .attr("rx","5")
   .attr("ry","5")
   .attr("width",function(d:any){return d.width})
   .attr("height",function(d:any){return d.height})
   .attr("stroke","pink")
   .attr("fill",
   function(d:any){
      if(d.positionalPairOfApi.includes(d.positionalPair)) {
          d.filled = true;
       return "pink"
     }
     else
     {
         d.filled = false;
         return "#fff"
     }
   }
   )
   .attr("class",function(d:any){
       if(d.positionalPairOfApi.includes(d.positionalPair)){
           return "filledsquare"
       }
       else{
           return "square"
       }
   })
   .on('click',function(d:any,i){
       if(!d.filled)
       {
       d3.select(this)
       .style("fill","pink")
       .attr('class',"filledsquare");
       d.filled = true;
       d.positionalPairOfApi.push(d.positionalPair);
        console.log(d.rawPosss);
        console.log(d.positionalPairOfApi)
        if(d.rawPosss != d.positionalPairOfApi)
        {
            document.getElementById("saveButton").style.display = "";
        }
        else
        {
            document.getElementById("saveButton").style.display = "none";
        }
      }
      else
      {
          d3.select(this)
          .style("fill","#fff")
          .attr('class',"square")
          d.filled = false;
          var index = d.positionalPairOfApi.indexOf(d.positionalPair);
          if (index > -1) {
              d.positionalPairOfApi.splice(index, 1);
              if(d.rawPosss != d.positionalPairOfApi)
              {
                  //console.log('not matching')
                  document.getElementById("saveButton").style.display = "";
              }
              else
              {
                  //console.log('matching')
                  document.getElementById("saveButton").style.display = "none";
              }
        
          }
      }
   })
  
   .on("mouseover", function(d:any,i){
      var x = document.getElementById(d.greekIndexWise);
      var y = document.getElementById(d.hindiIndexWise);
      x.style.fontSize = "20px";
      x.style.fill="#008000";
      y.style.fontSize = "20px";
      y.style.fill="#008000";
   })
  
   .on("mouseout", function(d:any){
      var x = document.getElementById(d.greekIndexWise);
      var y = document.getElementById(d.hindiIndexWise);
      x.style.fontSize = "16px";
      x.style.fill="black";
      y.style.fontSize = "16px";
      y.style.fill="black";
  })
  
  
  d3.selectAll("text")
  .data(gridData[0])
   //.append("text")
      .attr("transform", function (d:any,i) {
             var xAxis = d.x + 25;
                  return "translate(" + xAxis + ",85)rotate(300)" ;
              })
      .style("font-size", "16px")
      .attr("id",function(d:any,i){
          return d.greekIndexWise;
      })
      .text(function(d:any,i){
           return d.greekHorizontalWords[i];
      })
      .on("mouseover", function(d:any,i){
          d3.select(this).transition()
          .attr("transform", function (d:any,i) {  
              var xAxis = d.x + 25;
              return "translate(" + xAxis + ",85)rotate(300)" ;
               })
           tooltip.style("display",null)
       })
  
       .on("mouseout", function(d){
       
            tooltip.style("display","none")
      })
      .on('mousemove', function(d:any,i){
      })
      .on('click',function(d,i)
      {
          iframe.style("display",null)
      })
  
   var tooltip  = grid.append("g")
                  .attr("class",tooltip)
                  .style("display","none");
  
      tooltip.append("text")
             .attr("x",45)
             .attr("dy","1.2em")
             .style("font-size","1.25em")
  
  
  var iframe  = grid.append("g")
             .attr("class",tooltip)
             .style("display","none");
  
         iframe.append("iframe")
         .attr("src",'https://www.youtube.com/embed/tgbNymZ7vqY')
  d3.selectAll(".row")
  .data(gridData)
  .append("text")
      .attr("x", "30")
      .attr("y", function (d,i) {
              return d[0].y + 25;
          })
          .style("font-size", "16px")
          .attr("id",function(d,i){
              return d[0].hindiIndexWise;
          })
      .text(function(d,i){
          return d[0].hindiVerticalWords[i];
      })


// For making the svg matrix scrollable
      d3.selectAll("svg")
      .data(gridData)
      .attr("width",function(d,i){          
          let len = d.length;
          len = (len * 35) + 120;
       return len;
      })
      .attr("height",function(d,i){
        let len = d[0].hindiVerticalWords.length;
        len = (len * 35) + 120;
        return len;
        })
 // Ended Here    
 
    });
   
  }

}
