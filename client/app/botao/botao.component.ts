import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    moduleId : module.id,
    selector: 'botao',
    templateUrl : './botao.component.html'
})
export class BotaoComponent{
    @Input() nome: string = 'Ok';
    @Input() estilo: string = 'btn-default';
    @Input() tipo: string = 'button';
    @Input() desabilitado: boolean = false;
    @Output() acao = new EventEmitter();
    @Input() confirmar: boolean;

    executaAcao(){
        if(this.confirmar){
            if(confirm('mensagem')){
                this.acao.emit(null);
            }
            return
        }
        this.acao.emit(null);
    }
}