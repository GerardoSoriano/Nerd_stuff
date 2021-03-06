<?php
include_once('connection.php');
include_once(dirname(__DIR__).'/model/productoCompra.php');
include_once(dirname(__DIR__).'/model/usuario.php');
include_once(dirname(__DIR__).'/model/categoria.php');

class ProductoCompraMetodos
{

  function __construct(){}

  function ProductoComprado($productoCompra){
    $pdo = new Connection();
    $conn = $pdo->getConnection();
    try {
      $stm = $conn->prepare("call productoComprado(?,?)");
      $idCompra = $productoCompra->getIdCompra();
      $idProducto = $productoCompra->getIdProducto();
      $stm->bindParam(1,$idCompra);
      $stm->bindParam(2,$idProducto);
      $result = $stm->execute();
      return $result;
    } catch (PDOException $e) {
      die($e->getMessage());
    } finally {
      $conn = null;
      $pdo->closeConnection();
    }
  }
  function ComprasPorUsuario($idUsuario){
    $pdo = new Connection();
    $conn = $pdo->getConnection();
    try {
      $stm = $conn->prepare("call comprasPorUsuario(?)");
      $stm->bindParam(1,$idUsuario);
      $stm->execute();
      $result = $stm->fetchAll();
      return $result;
    } catch (PDOException $e) {
      die($e->getMessage());
    } finally {
      $conn = null;
      $pdo->closeConnection();
    }
  }
  function ComprasPorMes($usuario,$fecha){
    $pdo = new Connection();
    $conn = $pdo->getConnection();
    try {
      $stm = $conn->prepare("call comprasPorMes(?,?)");
      $stm->bindParam(1,$usuario->getIdUsuario());
      $stm->bindParam(2,$fecha);
      $stm->execute();
      $result = $stm->fetchAll();
      return $result;
    } catch (PDOException $e) {
      die($e->getMessage());
    } finally {
      $conn = null;
      $pdo->closeConnection();
    }
  }
  function ComprasPorRangoDeFechas($usuario,$fechaInicio,$fechaFinal){
    $pdo = new Connection();
    $conn = $pdo->getConnection();
    try {
      $stm = $conn->prepare("call comprasRangoFechas(?,?,?)");
      $stm->bindParam(1,$usuario->getIdUsuario());
      $stm->bindParam(2,$fechaInicio);
      $stm->bindParam(3,$fechaFinal);
      $stm->execute();
      $result = $stm->fetchAll();
      return $result;
    } catch (PDOException $e) {
      die($e->getMessage());
    } finally {
      $conn = null;
      $pdo->closeConnection();
    }
  }
  function MasComprados(){
    $pdo = new Connection();
    $conn = $pdo->getConnection();
    try {
      $stm = $conn->prepare("call masComprados()");
      $stm->execute();
      $result = $stm->fetchAll();
      return $result;
    } catch (PDOException $e) {
      die($e->getMessage());
    } finally {
      $conn = null;
      $pdo->closeConnection();
    }
  }
  function MasCompradosPorCategoria($categoria){
    $pdo = new Connection();
    $conn = $pdo->getConnection();
    try {
      $stm = $conn->prepare("call masCompradosCategoria(?)");
      $stm->bindParam($categoria->getIdCategoria());
      $stm->execute();
      $result = $stm->fetchAll();
      return $result;
    } catch (PDOException $e) {
      die($e->getMessage());
    } finally {
      $conn = null;
      $pdo->closeConnection();
    }
  }
  function UltimasCompras($usuario){
    $pdo = new Connection();
    $conn = $pdo->getConnection();
    try {
      $stm = $conn->prepare("call ultimasCompras(?)");
      $idUsuario = $usuario->getIdUsuario();
      $stm->bindParam(1,$idUsuario);
      $stm->execute();
      $result = $stm->fetchAll();
      return $result;
    } catch (PDOException $e) {
      die($e->getMessage());
    } finally {
      $conn = null;
      $pdo->closeConnection();
    }
  }
}

 ?>
