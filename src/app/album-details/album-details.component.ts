import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SpotifyService} from '../spotify.service';
import {flatMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Subject } from "rxjs";
import { map } from "rxjs/operators";



 
@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css'],
})

export class AlbumDetailsComponent implements OnInit {
    id: string = null;
    albumDetails = null;
    tracksDetails = null;
    searchStr: string;
    searchTerm$ = new Subject();
    resultItems = [];
    artist = null;
    albums$: Observable<any> = null;
   
  constructor(
      private route: ActivatedRoute,
      private spotifyService: SpotifyService,
  ) { }

  ngOnInit() {
      this.getAlbumId();
      this.getAlbum();
      this.getArtistId();
      this.getAlbums();
      this.getArtist();
  }

  getAlbumId() {
    this.id = this.route.snapshot.params.id;
  }

  getAlbum() {
    this.spotifyService.searchAlbumById(this.id)
        .pipe(
            flatMap(res => {
                this.albumDetails = res;
                return this.spotifyService.searchAlbumByIdTracks(this.id)
            }),
        )
        .subscribe(res => {
            this.tracksDetails = res;
        });
  }

    viewInSpotify(url: string) {
      window.open(url);
    }
    getArtistId() {
      this.id = this.route.snapshot.params.id;
    }
    getAlbums() {
      this.albums$ = this.spotifyService.searchArtistAlbum(this.id).pipe(
        map((res: any) => {
          return res.items.filter(item => item);
        })
      );
    }
    getArtist() {
      this.spotifyService
        .searchArtist(this.id)
        .pipe()
        .subscribe(res => {
          console.log(res);
          this.artist = res;
        });
    }
}
