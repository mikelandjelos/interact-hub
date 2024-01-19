import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  constructor(private fb:FormBuilder){}
  ngOnInit() {
    this.postForm = this.fb.group({
      postContent: ['', Validators.required]
    });
  }
  handlePostClick(event: Event) {
    event.preventDefault(); 
  
  
  }
  handleGalleryImageSelect(event: any): any {
    const selectedFile = event.target.files[0];
    
    if (selectedFile) {
      this.selectedImage=selectedFile;
      console.log('Izabrana slika iz galerije:', selectedFile);
    }
  }
}
