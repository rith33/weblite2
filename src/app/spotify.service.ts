import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class SpotifyService {
  getHeader(query: string) {
    const url = "https://api.spotify.com/v1/" + query;
    let headers = new HttpHeaders();
    headers = headers.append(
      "Authorization",
      "Bearer BQABlssb-NH7JTGhEsGxeiZoogVxKWpcXlN6Nk9_59ChLYE0WcpL2Y89-emzoaeWLLFHJrplRJvlV5NoWMkR-PKEltJKdao5haKCZBVsHACmAQXI_nf1DVu-wEXWhK7iGFxHRZiCWE3fVnzK19Jy9ulGef7HX8V6e_9JOJZqJ-4ue756G-TeWxAqgmFv6refPw3tG7UX9KSl_i6CY6oVKuctNrlc2-nEuCFGpCu89WWh23HiOpFSaq6jVpb8m7iOvy7I1PE76U0oXg"
    );
    return this._http.get(url, { headers });
  }
  constructor(private _http: HttpClient) {}

  searchMusic(str: string, type = "album") {
    const param = "&offset=0" + "&limit=20" + "&type=" + type + "&market=US";
    const query = "search?query=" + str + param;
    return this.getHeader(query);
  }

  searchArtistAlbum(id: string) {
    const query = `artists/${id}/albums`;
    return this.getHeader(query);
  }

  searchArtist(id: string) {
    const query = `artists/${id}`;
    return this.getHeader(query);
  }

  searchAlbumById(id: string) {
    const query = `albums/${id}`;
    return this.getHeader(query);
  }

  searchAlbumByIdTracks(id: string) {
    const query = `albums/${id}/tracks`;
    return this.getHeader(query);
  }
}
