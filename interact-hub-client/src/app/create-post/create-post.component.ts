import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationPopupComponent } from '../notification-popup/notification-popup.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent implements OnInit{
  postForm:FormGroup = new FormGroup({});
  selectedImage: File | null = null;
  user:any;
  constructor(private fb:FormBuilder, private userService:UserService, private dialog:MatDialog){}
  ngOnInit() {
    const userJson = localStorage.getItem('user') ?? '';
    this.user = JSON.parse(userJson);
    this.postForm = this.fb.group({
      postContent: ['', Validators.required]
    });
  }
  handlePostClick(event: Event) {
    event.preventDefault(); 
    
    const content = this.postForm.value.postContent;
    const post = {
      content:content,
      date:Date.now(),
      username:this.user.username
    }
    this.userService.createPost(post,this.user.username).subscribe((respo)=>{
      this.dialog.open(NotificationPopupComponent,{
        data:{
          title:"Notification",
          text:"Successful created"
        }
      })
    }
    );
  }
  handleGalleryImageSelect(event: any): any {
    const selectedFile = event.target.files[0];
    
    if (selectedFile) {
      this.selectedImage=selectedFile;
      console.log('Izabrana slika iz galerije:', selectedFile);
    }
  }
}
