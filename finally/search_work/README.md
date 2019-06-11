## Eight Queen

* 執行結果太長就不放了,顯示各種皇后的位子，最後有數量
* var queen_num = 8; 可以改成這種數量
```
$ node eight_queen.js 
```
## 狼與羊
```
$ node sheep_wolf.js
[ 1, 1, 1, 1 ]
[ 0, 1, 0, 1 ]
[ 1, 1, 0, 1 ]
[ 0, 1, 0, 0 ]
[ 1, 1, 1, 0 ]
[ 0, 0, 1, 0 ]
[ 1, 0, 1, 0 ]
[ 0, 0, 0, 0 ]
```
##   拼圖
* 顯示每一次拼圖所走的位子
```
$ node puzzle.js
[ [ 1, 2, 3 ], [ 8, 0, 4 ], [ 7, 6, 5 ] ]
[ [ 1, 0, 3 ], [ 8, 2, 4 ], [ 7, 6, 5 ] ]
[ [ 1, 3, 0 ], [ 8, 2, 4 ], [ 7, 6, 5 ] ]
[ [ 1, 3, 4 ], [ 8, 2, 0 ], [ 7, 6, 5 ] ]
[ [ 1, 3, 4 ], [ 8, 2, 5 ], [ 7, 6, 0 ] ]
[ [ 1, 3, 4 ], [ 8, 2, 5 ], [ 7, 0, 6 ] ]
```

## 迷宮
* 我用excel的vba來寫,github放不上去
* [載點](https://blackfloat.com/迷宮.xlsm)
* 直接點開迷宮 上面點選啟動巨集
* 點進去旁邊有一個按鈕點下去它會自動著色找到終點,下面有三張地圖可以讓他跑
* 程式碼如下
````
Public Function find(Column As Long, Row As Long, ex_dir As Integer, wall_color As Long)
    Dim i As Integer
    Dim j As Integer
    find = 0 '這邊return 0代表沒找到
    For j = 1 To 4 '這邊來判斷是否找到end
        '=====找end開始====
        Select Case j '用switch case 來找四面八方是否有End
            Case 1
                If (Cells(Column + 1, Row).Value) = "End" Then '如果找到end 就開始return
                    Cells(Column, Row).Interior.Color = 1106 '帶入顏色
                    Cells(Column + 1, Row).Interior.Color = 1106 '帶入顏色
                    find = 1
                    Exit Function
                End If
            Case 2
                If (Cells(Column, Row - 1).Value) = "End" Then
                    Cells(Column, Row).Interior.Color = 1106 '帶入顏色
                    Cells(Column, Row - 1).Interior.Color = 1106 '帶入顏色
                    find = 1
                    Exit Function
                End If
            Case 3
                If (Cells(Column - 1, Row).Value) = "End" Then
                    Cells(Column, Row).Interior.Color = 1106 '帶入顏色
                    Cells(Column - 1, Row).Interior.Color = 1106 '帶入顏色
                    find = 1
                    Exit Function
                End If
            Case 4
                If (Cells(Column, Row + 1).Value) = "End" Then
                    Cells(Column, Row).Interior.Color = 1106 '帶入顏色
                    Cells(Column, Row + 1).Interior.Color = 1106 '帶入顏色
                    find = 1
                    Exit Function
                End If
        End Select
        '=======找尋完成======='
    Next j
    For i = 1 To 4 '四面八方找尋牆壁
    '========開始找牆壁=========
        Select Case i
            Case 1
                If (i) <> ex_dir Then '要先判斷跟上一步是否一樣，避免走回頭路
                    If (Cells(Column - 1, Row).Interior.Color <> wall_color) Then '找尋牆壁
                        x = find(Column - 1, Row, 3, wall_color) '找到有路走就開始遞迴，傳回值為1的話就一直return回來 也把自己的 return value 也為1 開始全部算回來
                       If (x) = 1 Then
                       find = 1
                        Cells(Column, Row).Interior.Color = 1106 '帶入顏色
                        Exit Function
                       End If
                    End If
                End If
            Case 2
                If (i) <> ex_dir Then
                    If (Cells(Column, Row + 1).Interior.Color <> wall_color) Then
                       x = find(Column, Row + 1, 4, wall_color)
                       If (x) = 1 Then
                        find = 1
                        Cells(Column, Row).Interior.Color = 1106
                        Exit Function
                       End If
                    End If
                End If
            Case 3
                If (i) <> ex_dir Then
                    If (Cells(Column + 1, Row).Interior.Color <> wall_color) Then
                        x = find(Column + 1, Row, 1, wall_color)
                       If (x) = 1 Then
                        find = 1
                        Cells(Column, Row).Interior.Color = 1106
                        Exit Function
                       End If
                    End If
                End If
            Case 4
                If (i) <> ex_dir Then
                    If (Cells(Column, Row - 1).Interior.Color <> wall_color) Then
                        x = find(Column, Row - 1, 2, wall_color)
                       If (x) = 1 Then
                        find = 1
                        Cells(Column, Row).Interior.Color = 1106
                        Exit Function
                       End If
                    End If
                End If
        End Select
        '======找完牆壁=====
    Next i
End Function
Sub 迷宮1()
'=========迷宮我使用遞迴的方式===========
    Dim wall_color As Long
    wall_color = Cells(2, 4).Interior.Color '取得牆壁顏色
    find 3, 3, 1, wall_color '帶入function find() 3,3為起點 1為方向 1234分別代表上右下左 ,還有牆壁顏色
End Sub
````