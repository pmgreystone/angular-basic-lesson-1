import { Component } from '@angular/core';

interface User {
  username: String,
  email: String
}

@Component({
  selector: 'app-inner-text-demo',
  standalone: true,
  imports: [],
  templateUrl: './inner-text-demo.component.html',
  styleUrl: './inner-text-demo.component.css'
})
export class InnerTextDemoComponent {

  sampleHeading: String = "this is a sample heading";

  alertSampleString() {
    alert("greetings from typescript!");
  }

  getSampleString(): String {
    return "greetings from typescript!";
  }

  getSampleUser(): User {
    let user: User = {
      username: "steve_greystone",
      email: "steve@greystone.com"
    }
    return user
  }
}
