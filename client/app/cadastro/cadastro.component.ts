import { Component } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { FotoService } from '../foto/foto.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    moduleId : module.id,
    selector : 'cadastro',
    templateUrl: './cadastro.component.html'
})
export class CadastroComponent{
    foto: FotoComponent = new FotoComponent();
    mensagem: string = '';
    meuForm: FormGroup;
    service: FotoService;
    route: ActivatedRoute;
    router: Router;

    constructor(service: FotoService, fb: FormBuilder, route:ActivatedRoute, router: Router){
        this.meuForm = fb.group({
            titulo: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            url: ['', Validators.required],
            descricao: ['']            
        });

        this.service = service;
        this.route = route;
        this.router = router;
        this.route.params.subscribe(params => {
            let id = params['id'];
            if(id){
                this.service
                    .buscaPorId(id)
                    .subscribe(
                        foto => this.foto = foto,
                        erro => console.log(erro)
                    );
            }
        });
    }

    cadastrar(event){
        event.preventDefault();

        console.log(this.foto);

        this.service.cadastrar(this.foto)
        .subscribe(res => {
            this.foto = new FotoComponent();
            this.mensagem = res.mensagem;
            if(!res.inclusao){
                this.router.navigate(['']);
            }
            console.log("foto salva com sucesso");
        }, erro => console.log(erro));
        
    }
}