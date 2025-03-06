import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Setting {
  name: String
}

class ClassroomSetting implements Setting {
  name: String

  constructor(name: String) {
    this.name = name;
  }
}

class CourseSetting implements Setting {
  name: String

  constructor(name: String) {
    this.name = name;
  }
}

@Component({
  selector: 'structural-directives-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './structural-directives-component.component.html',
  styleUrl: './structural-directives-component.component.css'
})
export class StructuralDirectivesComponentComponent {
  isAdmin: Boolean = true;
  settings: Setting[] = [
    new ClassroomSetting("add student"),
    new ClassroomSetting("update student"),
    new CourseSetting("add course"),
    new CourseSetting("update course"),
  ];
}
