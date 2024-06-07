// file: add_budget_item.php
<?php
header('Content-Type: application/json');
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

$stmt = $pdo->prepare('INSERT INTO budget_items (name, amount, type, notes) VALUES (?, ?, ?, ?)');
$stmt->execute([$data['name'], $data['amount'], $data['type'], $data['notes']]);

$data['id'] = $pdo->lastInsertId();
echo json_encode($data);
?>
