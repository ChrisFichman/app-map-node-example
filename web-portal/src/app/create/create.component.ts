import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent {
  submitted : boolean = false;
  shortUrl : string = '';
  linkPlaceholder = "https://some.incredibly.long.somehow.mind.bogglingly.com/plicated/url/that/someone/would/dieofoldage/before/being/able?to=read";
  linkForm = this.formBuilder.group({
    origUrl: ''
  })

  constructor(
    private urlService: UrlService,
    private formBuilder: FormBuilder
  ) {}

  onSubmit(): void {
    //Submit link to service to be shortened
    if (this.linkForm.value.origUrl) {
      this.submitted = true;
      this.shortUrl = '';
      this.urlService
        .createShortUrl(this.linkForm.value.origUrl)
        .subscribe(response => {
          this.shortUrl = response.body.shortUrl;
          this.submitted = false;
          console.log(JSON.stringify(response));
        });
    }
  }

}
