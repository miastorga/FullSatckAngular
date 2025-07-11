import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Equipo {
  id: string,
  equipo: string,
  problema: string,
  estado: string,
  fechaEstimada: string,
  estadoBadgeClass: string,
  monto: number
}

export interface EquipoTecnico {
  id: string,
  cliente: string,
  equipo: string,
  problema: string,
  estado: string,
  costo: number
}

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  private URL = "https://miastorga.github.io/json-api/equipos.json"
  private URLTecnico = "https://miastorga.github.io/json-api/equipo-tecnico.json"
  private http = inject(HttpClient)

  // Equipos Normales
  getEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.URL)
  }

  getEquipoById(id: string): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.URL}/${id}`)
  }

  createEquipo(equipo: Equipo): Observable<Equipo> {
    return this.http.post<Equipo>(this.URL, equipo)
  }

  updateEquipo(id: string, equipo: Equipo): Observable<Equipo> {
    return this.http.put<Equipo>(`${this.URL}/${id}`, equipo)
  }

  deleteEquipo(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`)
  }

  // Equipos Tecnico
  getEquiposTecnico(): Observable<EquipoTecnico[]> {
    return this.http.get<EquipoTecnico[]>(this.URLTecnico)
  }

  getEquipoTecnicoById(id: string): Observable<EquipoTecnico> {
    return this.http.get<EquipoTecnico>(`${this.URLTecnico}/${id}`)
  }

  createEquipoTecnico(equipoTecnico: EquipoTecnico): Observable<EquipoTecnico> {
    return this.http.post<EquipoTecnico>(this.URLTecnico, equipoTecnico)
  }

  updateEquipoTecnico(id: string, equipoTecnico: EquipoTecnico): Observable<EquipoTecnico> {
    return this.http.put<EquipoTecnico>(`${this.URLTecnico}/${id}`, equipoTecnico)
  }

  deleteEquipoTecnico(id: string): Observable<any> {
    return this.http.delete(`${this.URLTecnico}/${id}`)
  }
}
