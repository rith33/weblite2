import { Component, OnInit } from "@angular/core";
import { SpotifyService } from "../spotify.service";
import { Subject } from "rxjs";
import { debounceTime, takeUntil, take } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

interface SpotifyResponse {
  albums: IAlbum;
}

interface IAlbum {
  href: string;
  items: any[];
  limit: number;
  next: any;
  offset: number;
  previous: any;
  total: number;
}

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
  providers: [SpotifyService]
})
export class SearchComponent implements OnInit {
  searchStr: string;
  searchTerm$ = new Subject();
  resultItems = [];
  constructor(
    private _spotifyService: SpotifyService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.searchMusic();
    this.listenForKeyupSearch();
  }

  listenForKeyupSearch() {
    this.searchTerm$
      .pipe(debounceTime(1000))
      .subscribe(() => this.searchMusic());
  }

  searchMusic() {
    if (this.searchStr)
      this._spotifyService
        .searchMusic(this.searchStr)
        .subscribe((response: SpotifyResponse) => {
          this.resultItems = response.albums.items.slice();
          console.log(response.albums.items);
        });
    else this.resultItems = [];
  }

  listenForDetails(data) {
    this.router.navigate(["album", data.id]);
  }
}
