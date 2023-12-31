import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScrollToBottomDirective } from './scroll-to-bottom-directive';
import { SparkoutChatWidgetService } from './sparkout-chat-widget.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() baseUrl: any;
  title = 'sparkout-chat-widget';
  public showMessagePanel: boolean = false;
  public chatForm:FormGroup;
  public answer:any ='';
  public message:any;
  public apiresonsemessage:Array<string>=[];
  public storage:any;
  public messages:Array<string>=[];
  public storedArray:any;
  public updatedArrayString:any=[];
  public updateMessage:any;
  public showSpinner:boolean=false
  public messagesString:any;
  public scrollTop:any;
  public scrollDirection:any;
  @ViewChild(ScrollToBottomDirective)
  scroll!: ScrollToBottomDirective;

  constructor(private chatservice: SparkoutChatWidgetService, private formBuilder:FormBuilder){
    this.chatservice.setBaseURI(this.baseUrl);
    this.chatForm = this.formBuilder.group({
      message: ['', Validators.required],
    });
  }
  public toggleMinMax:any;
  ngOnInit(): void {
    this.toggleMinMax=false;
    this.chatservice.storeDigitalFiels().subscribe(a=>{
     this.answer=a;
     this.storage= this.answer;
    })
    this.messages=[];
    this.apiresonsemessage=[];
    //this.scrollDirection();
  }

  messageSend(){
    if(this.chatForm.valid){
        this.messages.push(this.chatForm.value.message);
      if(this.chatForm.value.message){
        this.chatservice.sendMessage(this.chatForm.value.message).subscribe((data: any)=>{
          const showData: string=data?.body?.answer;
          if(showData){
            this.showSpinner=true;
            this.apiresonsemessage.push(showData);

          }
       })
        this.chatForm.reset();
      }
    }
  }

  public openMessagePanel() {
    this.showMessagePanel = !this.showMessagePanel;
  }

}

