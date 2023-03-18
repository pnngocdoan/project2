import './App.css';
import Card from './components/Card';
import GuessBox from './components/GuessBox';
import { useState } from 'react';

const App = () => {
  const [lesson, setLesson] = useState(1);
  const lessonName = ["Plots", "Statistics", "Data Exploration"]
  const cardsData = [
    {id: 1, 
     question: 'What is linear regression?', 
     answer: 'a model that estimates the relationship between one independent variable and one dependent variable using a straight line', 
     code: 
     `sns.lmplot(x="x", y="y", data=df, ci=None, scatter_kws={"s": 80})
     # ci is to not show the confidence interval
     # scatter_kws has to do with the size of the points 
     
     c=sns.lmplot(x="x", y="y", data=df, order=2) 
     # use order to make a second-order polynomial regression`,
     isTrue: "True"},
    {id: 2, 
     question: 'What is a residuals plot?', 
     answer: 'a scatter plot of residual values, measuring how much a regression line vertically misses a data point', 
     code: 'sns.residplot(x="x", y="y", data=df)',
     isTrue: "True"},
    {id: 3, 
     question: 'How to obtain the linear equation from linear regression?', 
     answer: 'use the Scipy library by simply plotting the linear regression, and add the plot.legend() function', 
     code: 
     `from scipy import stats

     # get coefficients of linear fit
     slope, intercept, r_value, p_value, std_err = stats.linregress(df.x,df.y)
     
     # use line_kws to set line label for legend
     plot = sns.regplot(x="x", y="y", data=df, line_kws={'label':"y = {0:.1f} x + {1:.1f}; r = {2:.2f}".format(slope,intercept, r_value)})
     
     # plot legend
     plot.legend()`,
     isTrue: "True"},
    {id: 4, 
     question: 'How to calculate confidence interval?', 
     code: 
     `import numpy as np
     
     mean = np.mean(df)
     N = np.size(df)
     SD = np.std(df)
     SE = SD /np.sqrt(N)
     # SE is the standard error of the mean, indicating the uncertainty around the estimate of the mean
     print("mean: %.2f N: %.2f Standard Error: %.2f" % (mean, N, SE)'`,
     isTrue: "False"},
    {id: 5, 
     question: "What is Student's t-test?", 
     answer: 'used to compare the mean of one or two normally distributed populations, preferably of equal size and variance by proposing an estimator of the likelihood of a Null Hypothesis',
     isTrue: "True"},
    {id: 6, 
     question: "What is Equality of Variances?", 
     answer: 
     `A common assumption for many tests is that the variance for the different sets must be the same. So it's always handy to have a tool that can check this assumption before processing. `, 
     code: 
    `test5=pg.homoscedasticity(data=[df_red["alcohol"].to_numpy(),df_white["alcohol"].to_numpy()], alpha=0.05)`,
     isTrue: "True"},
    {id: 7, 
     question: 'What is ANOVA?', 
     answer: 'a test checking if all the means of the selected groups are unequal',
     isTrue: "False"},
    {id: 8, 
     question: 'How to rescale the data by standardizing variables?', 
     code: 
    `from sklearn.preprocessing import StandardScaler
    scaled = StandardScaler().fit_transform(df)
    df_scaled = pd.DataFrame(data=scaled, columns=df.columns)
    ax = sns.boxplot(data=df_scaled, orient="h", palette="rainbow")`,
    isTrue: "True"},
    {id: 9, 
     question: 'How to combine scatter plot and marginal histograms?', 
     code: 
    `import scipy.stats as stats
    joint_plt = sns.jointplot(y='pH', x='fixed acidity', data=df, kind='reg',)
    
    r, p = stats.pearsonr(df['fixed acidity'], df['pH'])
    joint_plt.ax_joint.annotate(f'$\rho = {r:.3f}, p = {p:.3f}$',
                        xy=(0.1, 0.9), xycoords='axes fraction',
                        ha='left', va='center',
                        bbox={'boxstyle': 'round', 'fc': 'powderblue', 'ec': 'navy'})`,
     isTrue: "True"},
    {id: 10, 
     question: 'What is Pearson correlation coefficient and the p-value.?', 
     answer: 
    `The Pearson correlation coefficient allows us to easily observe linear dependencies between two data sets. 
    -1: total positive linear correlation, 0: no linear correlation, +1: total negative linear correlation. 
      
    The p-value roughly indicates the probability that uncorrelated datasets have a Pearson correlation coefficient at least as extreme as the determined for these datasets. 
    P<0.05): the correlation coefficient is statistically significant.`,
     isTrue: "False"},  
    {id: 11, 
     question: 'How to create a Heatmap?', 
     code: 
    `# We calculate correlation with Pearson's coefficient using Pandas:
    correlation = df.corr(method='pearson')
    # We create a new figure using matplotlib and set the figure size:
    fig=plt.gcf()
    fig.set_size_inches(10,10)
    # Heatmap of the correlation using Seaborn:
    sns.heatmap(correlation, annot=False,square=True)`,
     isTrue: "True"},
    {id: 12, 
     question: 'How to plot a pairplot?', 
     code: 
    `sns.pairplot(df[['fixed acidity','volatile acidity','citric acid', 'pH']], corner=False) 
     #corner=True hides the upper portion of the matrix`,
     isTrue: "True"},
    {id: 13, 
     question: 'Name some variable reduction techniques?', 
     answer:
     `PCA (Principal Components Analysis): defines a new set of coordinates (components) from a large dataset with multiple variables, and transforms the values into the new coordinates. 
     t-SNE (t-distributed Stochastic Neighbor Embedding): determines the similarity between pairs of points in a high dimensional space and replicates this similarity in a low dimensional space based on the probability distribution of the distances.
     UMAP (Uniform Manifold Approximation and Projection): an alternative to t-SNE for visualization, that preserves more of the global structure with better run time performance
     `,
     isTrue: "True" 
    } 
  ];
  const updateLesson = () => {
    if (cardIndex >= 1 && cardIndex <= 3) setLesson(1);
    if (cardIndex >= 4 && cardIndex <= 7) setLesson(2);
    if (cardIndex >= 8 && cardIndex <= 13) setLesson(3);
  }
  const [cardIndex, setCardIndex] = useState(0);
  const currentCard = cardsData[cardIndex];
  const handleNextClick = () => {
    setCardIndex(cardIndex + 1);
    updateLesson();
  };
  const handlePrevClick = () => {
    setCardIndex(cardIndex - 1);
    updateLesson();
  };
  const onCheckAnswer = () => {};
  return (
    <div className='App'>
      <div className='header'>
        <h1>Introduction to Machine Learning</h1>
        <h2>Struggle to study Machine Learning? No worries, our 13 flashcards covering 3 lessons will help you!</h2>
        <h3>Lesson {lesson}: {lessonName[lesson - 1]}</h3>
        <h3>Number of cards: {cardIndex + 1}</h3>
      </div>
      <div className='container'>
        <Card question={currentCard.question}
              answer={currentCard.answer}
              code={currentCard.code} />
        <div className="guess-button">
          <GuessBox />
          <button type="submit" className="button submit" onClick={onCheckAnswer}>Check Answer</button>
        </div>
        <div className='button-container'>
          <button class='prev-btn'><i class="fa fa-arrow-left" onClick={handlePrevClick}></i></button>
          <button class='next-btn'><i class="fa fa-arrow-right" onClick={handleNextClick}></i></button>
        </div>
      </div>
    </div>
  )
}

export default App;