import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {ComponentsService} from '../components.service';

@Component({
    selector: 'app-components-detail',
    templateUrl: './components-detail.component.html',
    styleUrls: ['./components-detail.component.css']
})
export class ComponentsDetailComponent implements OnInit, AfterViewInit {
    @ViewChild('iframe') iframe: ElementRef;
    component;

    private isInited: boolean;

    constructor(private componentService: ComponentsService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.componentService.getComponents(params.get('id')))
            .subscribe(component => {
                this.component = component;
                this.onIframeLoad();
            });
    }

    ngAfterViewInit() {
        this.isInited = true;
    }

    onIframeLoad() {
        if (this.isInited) {
            setTimeout(() => {
                this.iframe.nativeElement.width = '';
                this.iframe.nativeElement.height = '';
                this.iframe.nativeElement.contentWindow.document.body.innerHTML = '';
                this.iframe.nativeElement.contentWindow.document.write(
                    '<link rel="stylesheet" href="//static.rabota.ru/css/asset/app-3bd0052.css"/>' +
                    '<style>body{padding:20px}</style>' +
                    this.component.code
                );
                this.resizeIFrameToFitContent(this.iframe.nativeElement);
            }, 10);
        }
    }

    resizeIFrameToFitContent(iFrame) {
        setTimeout(() => {
            iFrame.width = iFrame.contentWindow.document.body.scrollWidth;
            iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
        }, 500);
    }
}
