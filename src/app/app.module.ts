import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { NZ_I18N } from 'ng-zorro-antd/i18n'
import { en_US } from 'ng-zorro-antd/i18n'
import { registerLocaleData } from '@angular/common'
import en from '@angular/common/locales/en'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { IconsProviderModule } from './shared/icons-provider.module'
import { ListComponent } from './components/list/list.component'
import { NzTableModule } from 'ng-zorro-antd/table'
import { NzTypographyModule } from 'ng-zorro-antd/typography'
import { NzSpaceModule } from 'ng-zorro-antd/space'
import { NzInputModule } from 'ng-zorro-antd/input'
import { ConvertComponent } from './components/convert/convert.component'
import { NzInputNumberModule } from 'ng-zorro-antd/input-number'

registerLocaleData(en)

@NgModule({
    declarations: [AppComponent, ListComponent, ConvertComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NzSelectModule,
        IconsProviderModule,
        NzTableModule,
        NzTypographyModule,
        NzSpaceModule,
        NzInputModule,
        NzInputNumberModule,
    ],
    providers: [{ provide: NZ_I18N, useValue: en_US }],
    bootstrap: [AppComponent],
})
export class AppModule {}
