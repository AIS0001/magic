 //////////////////////
 const cardAmount = 500;
 const companyShare = cardAmount*0.40;
 const empShare = cardAmount*0.20;
 const remainAmount = cardAmount-(companyShare+empShare);

 const pool1Amount = remainAmount*0.40;
 const pool2Amount = remainAmount*0.30;
 const pool3Amount = remainAmount*0.20;
 const pool4Amount = remainAmount*0.10;
 const poolwiseUsers =Math.round(15*0.25);
 const poll1UserAmount = pool1Amount/poolwiseUsers;
 const poll2UserAmount = pool2Amount/poolwiseUsers;
 const poll3UserAmount = pool3Amount/poolwiseUsers;
 const poll4UserAmount = pool4Amount/poolwiseUsers;
 //console.log(pool1Amount);
