import { Routes } from '@angular/router';
import { SignupComponent } from './components/member/signup/signup.component';
import { LoginComponent } from './components/shared/login/login.component';
import { LandingComponent } from './components/shared/landing/landing.component';
import { ProfileComponent } from './components/member/profile/profile.component';
import { HomeComponent } from './components/shared/home/home.component';
import { MapComponent } from './components/shared/map/map.component';
import { authGuard, notAuthGuard, ownerGuard } from './app-guards';
import { ActivityTabComponent } from './components/member/profile/tabs-section/activity-tab/activity-tab.component';
import { InfosTabComponent } from './components/member/profile/tabs-section/infos-tab/infos-tab.component';
import { NotificationsTabComponent } from './components/member/profile/tabs-section/notifications-tab/notifications-tab.component';
import { AlertNotificationsComponent } from './components/shared/home/main-section/flow-section/alert-notifications/alert-notifications.component';
import { AllNotificationsComponent } from './components/shared/home/main-section/flow-section/all-notifications/all-notifications.component';
import { EventNotificationsComponent } from './components/shared/home/main-section/flow-section/event-notifications/event-notifications.component';
import { HelpNotificationsComponent } from './components/shared/home/main-section/flow-section/help-notifications/help-notifications.component';
import { InfoNotificationsComponent } from './components/shared/home/main-section/flow-section/info-notifications/info-notifications.component';
import { ProfileVisitorComponent } from './components/shared/profile-visitor/profile-visitor.component';
import { MainComponent } from './components/main/main.component';

export const routes: Routes = [
    { path: 'hello/neighbors/landing', component: LandingComponent, canActivate: [notAuthGuard] },
    { path: '', redirectTo: 'hello/neighbors/landing', pathMatch: 'full' },
    { path: 'hello/neighbors/signup', component: SignupComponent, canActivate: [notAuthGuard] },
    { path: 'hello/neighbors/login', component: LoginComponent, canActivate: [notAuthGuard] },
    {
        path: 'hello/neighbors', component: MainComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'profile', component: ProfileComponent,
                children: [
                    { path: 'informations', component: InfosTabComponent },
                    { path: 'activity', component: ActivityTabComponent },
                    { path: 'notifications', component: NotificationsTabComponent },
                ]
            },
            { 
                path: 'user/:id', component: ProfileVisitorComponent,
                canActivate: [ownerGuard]
            },
            {
                path: 'home', component: HomeComponent,
                children: [
                    { path: 'all', component: AllNotificationsComponent },
                    { path: 'info', component: InfoNotificationsComponent },
                    { path: 'alert', component: AlertNotificationsComponent },
                    { path: 'help', component: HelpNotificationsComponent },
                    { path: 'event', component: EventNotificationsComponent },
                ]
            },
            { path: 'map', component: MapComponent }
        ]
    },
];