import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss']
})

export class LookupComponent {
  submitted : boolean = false;
  origUrl : string = '';
  linkForm = this.formBuilder.group({
    shortUrl: ''
  })

  constructor(
    private urlService: UrlService,
    private formBuilder: FormBuilder
  ) {}

  onSubmit(): void {
    //Submit link to service to be shortened
    if (this.linkForm.value.shortUrl) {
      this.submitted = true;
      this.origUrl = '';
      this.urlService
        .getOriginalUrl(this.linkForm.value.shortUrl)
        .subscribe(response => {
          this.origUrl = response.body.origUrl;
          this.submitted = false;
          console.log(JSON.stringify(response));
        });
    }
  }
}
