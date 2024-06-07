// file: get_budget_items.php
<?php
header('Content-Type: application/json');
include 'db.php';

$stmt = $pdo->query('SELECT * FROM budget_items');
$items = $stmt->fetchAll();

echo json_encode($items);
?>
