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
            if (this.container !== undefined) {
                for (let i = 0; i < this.container.nativeElement.getElementsByTagName('iframe').length; i++) {
                    this.loadIframe(i);
                }
            } else {
                setTimeout(() => {
                    console.log('Reloading');
                    this.ngAfterViewInit();
                }, 500);
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

                let preview;
                if (this.component.views[index].preview !== false && this.component.views[index].preview !== 'hidden') {
                    preview = this.component.views[index].preview;
                } else if (this.component.views[index].preview === 'hidden') {
                    preview = false;
                } else {
                    preview = this.component.views[index].code;
                }

                if (preview) {
                    iframe.width = '';
                    iframe.height = '';
                    iframe.contentWindow.document.body.innerHTML = '';
                    iframe.contentWindow.document.write(
                        '<link rel="stylesheet" href="//static.rabota.ru/css/asset/app-3bd0052.css"/>' +
                        '<style>body{padding:20px;overflow-y:auto;}</style>' +
                        preview
                    );
                    setTimeout(() => {
                        iframe.setAttribute('style', 'width:' + this.component.views[index].width + '; display: block');
                        iframe.height = iframe.contentWindow.document.body.scrollHeight;
                        this.container.nativeElement.querySelectorAll('.loading')[index].setAttribute('hidden', 'hidden');
                    }, 500);
                    iframe.classList.add('inited');
                }
                this.isInited = false;
            }, 500);
        }
    }

    onSelectChange($event: any, tabGroup: any) {
        if ($event.index === 0) {
            this.isInited = true;
            this.ngAfterViewInit();
        } else {
            hljs.highlightBlock(tabGroup._tabBodyWrapper.nativeElement.querySelector('code'));
            if (tabGroup._tabBodyWrapper.nativeElement.querySelector('iframe')) {
                tabGroup._tabBodyWrapper.nativeElement.querySelector('iframe').classList.remove('inited');
            }
        }
    }
}
