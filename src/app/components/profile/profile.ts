import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {UserData} from '../../interfaces/user.model';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile  implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private cdr= inject(ChangeDetectorRef);

  userForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
  });

  userData: UserData | undefined;
  user: any
  userId: string | null = null;

  password = '';
  isSubmitting = false;
  message = '';

  ngOnInit() {
    const stored = localStorage.getItem("response");
    if (!stored) {
      return;
    }
    const parsed = JSON.parse(stored);
    this.userId = null;
    if (parsed.user) {
      this.user = parsed.user;
      this.userId = this.user.userId;
    } else if (parsed.userId) {
      if (typeof parsed.userId === 'object') {
        this.user = parsed.userId;
        this.userId = this.user.userId;
      } else {
        this.userId = parsed.userId;
        this.user = {userId: this.userId};
      }
    } else {
      return;
    }
    if (this.userId) this.getUserById(this.userId);
  }

  getUserById(userId: string ) {
    this.userService.getUserById(userId).subscribe(
      (user: UserData) => {
        this.userData = user;
        this.cdr.detectChanges();
      },
      error => {
      },
    )
  }


  onSend() {
    if (!this.userForm.valid) {
      this.message = 'Password cannot be empty';
      setTimeout(()=>{
        this.message = "";
        this.cdr.detectChanges();
      }, 3000);
      return;
    }


    if (this.userId)
    this.userService.editUserById(this.userId,this.userForm.value)
      .subscribe(
        value => {
          alert()
        },
        error => {
          this.message = 'Password cannot be empty';
          setTimeout(()=>{
            this.message = "";
            this.cdr.detectChanges();
          }, 3000);
        },
      )



  }
}
