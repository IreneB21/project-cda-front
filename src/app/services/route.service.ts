import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RouteService {

    getProfileUserIdFromRoute(route: ActivatedRoute): string | null {
        let currentRoute: ActivatedRoute | null = route;

        while (currentRoute) {
            const id = currentRoute.snapshot?.paramMap.get('id');
            if (id) return id;
            currentRoute = currentRoute.parent;
        }

        return null;
    }
}