import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

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
  constructor(private fb:FormBuilder, private userService:UserService){}
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
      date:Date.now()
    }
    this.userService.createPost(post,this.user.username).subscribe((respo)=>console.log());
  }
  handleGalleryImageSelect(event: any): any {
    const selectedFile = event.target.files[0];
    
    if (selectedFile) {
      this.selectedImage=selectedFile;
      console.log('Izabrana slika iz galerije:', selectedFile);
    }
  }
}
