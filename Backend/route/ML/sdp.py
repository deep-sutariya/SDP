import numpy as np
import pandas as pd
# import matplotlib.pyplot as plt

dataset = pd.read_csv('./route/ML/Food.csv', header=None)

transactions=[]
for i in range(0, 155):
    transactions.append([str(dataset.values[i, j]) for j in range(0, 7)])



from apyori import apriori
rules = apriori(transactions= transactions, min_support=0.003, min_confidence=0.2, min_lift=3, min_length=2, max_length=2 )


# visualising results
results = list(rules)
# print(results)

# putting results in well organised manner
def inspect(results):
    lhs = [tuple(result[2][0][0])[0] for result in results]
    rhs = [tuple(result[2][0][1])[0] for result in results]
    supports = [result[1] for result in results]
    confidences = [result[2][0][2] for result in results]
    lifts = [result[2][0][3] for result in results]
    return list(zip(lhs, rhs, supports, confidences, lifts))
resultsinDataFrame = pd.DataFrame(inspect(results), columns = ['food1', 'food2', 'Support', 'Confidence', 'Lift'])
import sys;
# resultsinDataFramefilter = resultsinDataFrame[["food1","food2"]]
resultsinDataFramefilter1 = resultsinDataFrame[resultsinDataFrame["food1"].str.contains(sys.argv[1])]
resultsinDataFramefilter1 = resultsinDataFramefilter1[["food2","Lift"]]
resultsinDataFramefilter2 = resultsinDataFrame[resultsinDataFrame["food2"].str.contains(sys.argv[1])]
resultsinDataFramefilter2 = resultsinDataFramefilter2[["food1", "Lift"]]

# resultsinDataFramefilter1.add(resultsinDataFramefilter2)

resultant_helping = [resultsinDataFramefilter1, resultsinDataFramefilter2]
# final_df = final_df[["food1","food2"]]
final_df = pd.concat(resultant_helping)

# displaying the results non sorted
# print(resultsinDataFrame)

# displaying results by descending lift
# print(resultsinDataFrame.nlargest(n=5, columns='Lift'))
JsonFormattedOutput = final_df.nlargest(n=5, columns='Lift').to_json(orient='records')
# import json;
# print(JsonFormattedOutput);
# print(JsonFormattedOutput.food1);

import json;
import ast # abstract syntax tree;

# data_to_pass_back = JsonFormattedOutput;
# print(sys.argv[1]);
# input = sys
output = {}; 
output = JsonFormattedOutput;
print(output);

sys.stdout.flush();
