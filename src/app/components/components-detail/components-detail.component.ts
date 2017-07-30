import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {ComponentsService} from '../components.service';
import {ClipboardService} from '../../shared/clipboard.service';

declare var hljs: any;

@Component({
    selector: 'app-components-detail',
    templateUrl: './components-detail.component.html',
    styleUrls: ['./components-detail.component.css']
})
export class ComponentsDetailComponent implements OnInit, AfterViewInit {
    @ViewChild('container') container: ElementRef;
    @ViewChild('code')
    codeElement: ElementRef;
    component;

    private isInited: boolean;

    constructor(private componentService: ComponentsService,
                private route: ActivatedRoute,
                private clipboardService: ClipboardService) {
    }

    ngOnInit() {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.componentService.getComponents(params.get('id')))
            .subscribe(component => {
                this.component = component;
                if (this.isInited === false) {
                    this.ngAfterViewInit();
                }
            });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.isInited = true;
            for (let i = 0; i < this.container.nativeElement.getElementsByTagName('iframe').length; i++) {
                this.loadIframe(i);
            }
        }, 10);
    }

    copyCode(value) {
        this.clipboardService.copyValue(value);
    }

    loadIframe(index: number) {
        if (this.isInited) {
            setTimeout(() => {
                const iframe = this.container.nativeElement.querySelectorAll('iframe')[index];

                if (iframe.classList.contains('inited')) {
                    return;
                }

                iframe.width = '';
                iframe.height = '';
                iframe.contentWindow.document.body.innerHTML = '';
                iframe.contentWindow.document.write(
                    '<link rel="stylesheet" href="//static.rabota.ru/css/asset/app-3bd0052.css"/>' +
                    '<style>body{padding:20px}</style>' +
                    this.component.views[index].code
                );
                setTimeout(() => {
                    iframe.setAttribute('style', 'width:' + this.component.views[index].width + '; display: block');
                    iframe.height = iframe.contentWindow.document.body.scrollHeight;
                    this.container.nativeElement.querySelectorAll('.loading')[index].setAttribute('style', 'display:' +
                        ' none');
                }, 500);
                iframe.classList.add('inited');
                this.isInited = false;
            }, 500);
        }
    }

    onSelectChange($event: any, tabGroup: any) {
        if ($event.index === 0) {
            this.isInited = true;
            this.ngAfterViewInit();
        } else {
            console.log();
            hljs.highlightBlock(tabGroup._tabBodyWrapper.nativeElement.querySelector('code'));
            tabGroup._tabBodyWrapper.nativeElement.querySelector('iframe').classList.remove('inited');
        }
    }
}
