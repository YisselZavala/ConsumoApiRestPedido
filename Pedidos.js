var UrlGetPedidos = 'http://localhost:80/G2_19/controller/Pedidos.php?op=GetPedidos';
var UrlPostPedido = 'http://localhost:80/G2_19/controller/Pedidos.php?op=InsertPedido';
var UrlGetUno = 'http://localhost:80/G2_19/controller/Pedidos.php?op=GetUno';
var UrlPutPedido = 'http://localhost:80/G2_19/controller/Pedidos.php?op=UpdatePedido';
var UrlDeletePedido = 'http://localhost:80/G2_19/controller/Pedidos.php?op=DeletePedido';

$(document).ready(function(){
    CargarPedidos();
});


function CargarPedidos(){
    $.ajax({
        url: UrlGetPedidos,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores = '';

            for(i= 0; i < MiItems.length; i++){
                Valores +=  '<tr>'+
                '<td>'+ MiItems[i].ID+'</td>'+
                '<td>'+ MiItems[i].ID_SOCIO+'</td>'+
                '<td>'+ MiItems[i].FECHA_PEDIDO+'</td>'+
                '<td>'+ MiItems[i].DETALLE+'</td>'+
                '<td>'+ MiItems[i].SUB_TOTAL+'</td>'+
                '<td>'+ MiItems[i].TOTAL_ISV+'</td>'+
                '<td>'+ MiItems[i].TOTAL+'</td>'+
                '<td>'+ MiItems[i].FECHA_ENTREGA+'</td>'+
                '<td>'+ MiItems[i].ESTADO+'</td>'+
                '<td>'+ 
                '<div class="btn-group" role="group" aria-label="Basic mixed styles example">'+
                '<button class="btn btn-warning" onclick="CargarPedido(' + MiItems[i].ID + ')">Editar</button>'+
                '<button class="btn btn-danger" onclick="EliminarPedido('+ MiItems[i].ID+')">Eliminar</button>'+
                '</div>'+
                '</td>'+ 
                '</tr>';
                $('.pedidos').html(Valores);
            }
        }
    })
}


function AgregarPedido(){
    var datospedido = {
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_PEDIDO: $('#FECHA_PEDIDO').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SUB_TOTAL').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_ENTREGA: $('#FECHA_ENTREGA').val(),
        ESTADO: $('#ESTADO').val()
    };
    var datospedidojson= JSON.stringify(datospedido);

    $.ajax({
        url:UrlPostPedido,
        type: 'POST',
        data: datospedidojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response)
        }
    });
    alert("Pedido Agregado");

}


function CargarPedido(IDPEDIDO){
    var datospedido = {
        ID: IDPEDIDO
    };
    var datospedidojson= JSON.stringify(datospedido);

    $.ajax({
        url: UrlGetUno,
        type: 'POST',
        data:datospedidojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_PEDIDO').val(MiItems[0].FECHA_PEDIDO),
            $('#DETALLE').val(MiItems[0].DETALLE),
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL),
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV),
            $('#TOTAL').val(MiItems[0].TOTAL),
            $('#FECHA_ENTREGA').val(MiItems[0].FECHA_ENTREGA),
            $('#ESTADO').val(MiItems[0].ESTADO);
            var btnactualizar= '<input type="submit" id="btn_actualizar" onclick="ActualizarPedido('+MiItems[0].ID+')"'+
            'value="Actualizar Pedido" class="btn btn-primary"></input>';
            $('.buttonagregar').html(btnactualizar);
        }
    });

}



function ActualizarPedido(IDPEDIDO){
    var datospedido = {
        ID: IDPEDIDO,
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_PEDIDO: $('#FECHA_PEDIDO').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SUB_TOTAL').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_ENTREGA: $('#FECHA_ENTREGA').val(),
        ESTADO: $('#ESTADO').val()
    };
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: UrlPutPedido,
        type: 'PUT',
        data: datospedidojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response)
        }
    });
    alert("Pedido Actualizado");

}


function EliminarPedido(IDPEDIDO){
    var datospedido = {
        ID: IDPEDIDO
    };
    var datospedidojson= JSON.stringify(datospedido);

     $.ajax({
        url:UrlDeletePedido,
        type:'DELETE',
        data: datospedidojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
     alert("Pedido Eliminado");

}