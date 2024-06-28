export const AddedBookReviewMailLibrary = (bookReview) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            font-family: 'Arial', sans-serif;
            padding: 20px;
            color: #333;
            background-color: #f9f9f9;
            border-radius: 10px;
            border: 1px solid #ddd;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            margin: 20px 0;
        }
        .footer {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            text-align: center;
            font-size: 12px;
            border-radius: 0 0 10px 10px;
        }
        .book-details {
            margin-bottom: 20px;
        }
        .book-details dt {
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }
        .book-details dd {
            margin: 0 0 10px 0;
            padding: 10px;
            background-color: #f2f2f2;
            border-radius: 5px;
        }
        .book-details dt, .book-details dd {
            padding-left: 10px;
            border-left: 5px solid #4CAF50;
        }
        h1, h2 {
            font-family: 'Arial', sans-serif;
        }
        p {
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Book Review Added</h1>
        </div>
        <div class="content">
            <p>A new book review has been added to the library database. Here are the details:</p>
            <dl class="book-details">
                <dt>Book Name:</dt>
                <dd>${bookReview.bookName}</dd>
                <dt>Description:</dt>
                <dd>${bookReview.bookDsc}</dd>
                <dt>Type:</dt>
                <dd>${bookReview.bookType}</dd>
                <dt>Available in Library:</dt>
                <dd>${bookReview.presentAtLibrary ? "Yes" : "No"}</dd>
                <dt>Reference Number:</dt>
                <dd>${bookReview.referenceNumber || "N/A"}</dd>
                <dt>Review:</dt>
                <dd>${bookReview.bookReview}</dd>
            </dl>
        </div>
        <div class="footer">
            <p>This is an automated message. Please do not reply.</p>
        </div>
    </div>
</body>
</html>
`;
