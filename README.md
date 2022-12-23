My Trello Project

Next.js + Node.js + PostgreSQL

Demo -> https://app.sags.digital/public-share/message/2808ecec-0e8b-4c3d-bb38-aa745de11b38 sau fisierul .mp4 din arhiva atasata

Detalii de implementare si rulare:

Am impartit proiectul in partea de server si in partea de app, corespunzatoare folderelor server si my-app. Pentru rularea serverului
se foloseste yarn start si pentru cea a aplicatiei Next.js yarn dev. Partea de server contine in fisierul queries.js conectarea la baza de date si credentialele pentru aceasta. Am utilizat PostgreSQL datorita familiaritatii cu aceasta si a modului de lucru cu baze de date relationale.

In ceea ce priveste arhitectura tabelara, datale sunt impartite in 3 tabele. Exista un tabel de Boards care are o cheie primara de tip id, un camp pentru titlu si unul pentru culoare (in momentul crearii unui board acestuia i se atribuie la intamplare o culoare dintr-o lista). Exista apoi tabelul corespunzator listelor de task-uri numit Lists care are cheie primare, cheie secundara pentru legarea de tabelul boards (un board poate avea mai multe liste) si camp de titlu. Cel de-al treilea tabel, si ultimul, este cel de Cards in care se gaseste cheia primara, cheia secundara pentru legarea de tabelul Lists si campuri pentru nume si descriere.

Cu ajutorul acestei arhitecturi si a serverului creat a fost posibila stocarea informatiilor din interfata grafica. In fisierul server.js se gasesc variantele de posibile request-uri. Fiecare element (board, lista, card) are posibilitatea adaugarii, editarii, stergerii si afisarii. Uilizand getServerSideProps am facut request-urile de afisare pentru cele doua pagini (cea cu boards si cea cu listele de task-uri). Ruta pentru afisarea listelor este dinamica, ea depinzand de id-ul board-ului selectat. Asadar in partea de pages din my-app exista doua rute (una statica si una dinamica), iar in fisierele index.tsx am iterat prin raspunsul de la server si am afisat elementele necesare. Beneficiind de avantajele React-ului am structurat codul in mai multe componente in functie de nevoi. Spre exemplu, am realizat cate o componenta pentru fiecare modal care se deschide atunci cand utilizatorul selecteaza o anumita actiune. Am realizat si o componenta pentru stilizarea butonului din MUI si am facut si alte stilizari locale. Am folosit hook-ul useRouter pentru navigarea intre pagini.