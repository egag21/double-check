// file: delete_budget_item.php
<?php
header('Content-Type: application/json');
include 'db.php';

$id = $_GET['id'];

$stmt = $pdo->prepare('DELETE FROM budget_items WHERE id = ?');
$stmt->execute([$id]);

echo json_encode(['status' => 'success']);
?>
